import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Liquid } from "liquidjs";
import matter from "@11ty/gray-matter";
import MarkdownIt from "markdown-it";

export const sourceDirectory = fileURLToPath(new URL("../src/", import.meta.url));
export const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));

export async function build() {
  const site = JSON.parse(await readFile(`${sourceDirectory}/data/site.json`, "utf8"));
  const origin = new URL(site.url);
  if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash) {
    throw new Error("site.json: url에는 HTTPS 운영 사이트의 기본 주소를 입력해 주세요.");
  }
  const noindex = process.env.VERCEL_ENV === "preview";
  function createSeo(path, description, article = null) {
    const url = new URL(path, origin).href;
    const image = article ? article.image : site.image;
    const shareImage = image ?? site.image;
    const articleData = article ? {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: url,
      headline: article.title,
      description: article.summary,
      datePublished: article.publishedAt,
      author: { "@type": "Organization", name: article.author },
      publisher: { "@type": "Organization", name: site.name, url: origin.href },
      inLanguage: site.lang,
      articleSection: categories.find((category) => category.id === article.category).name,
      ...(image ? { image: new URL(image.src, origin).href } : {}),
    } : null;
    return {
      url, description, type: article ? "article" : "website", noindex,
      image: { url: new URL(shareImage.src, origin).href, alt: shareImage.alt },
      articleJson: articleData ? JSON.stringify(articleData).replace(/</g, "\\u003c") : null,
    };
  }
  const categories = JSON.parse(await readFile(`${sourceDirectory}/data/categories.json`, "utf8"));
  const home = JSON.parse(await readFile(`${sourceDirectory}/data/home.json`, "utf8"));
  const articleViews = JSON.parse(await readFile(`${sourceDirectory}/data/article-views.json`, "utf8"));
  const markdown = new MarkdownIt({ html: false });
  const articles = [];
  const slugs = new Set();
  const files = await readdir(`${sourceDirectory}/content/articles`);

  for (const file of files.filter((file) => file.endsWith(".md"))) {
    const source = await readFile(`${sourceDirectory}/content/articles/${file}`, "utf8");
    const { data, content } = matter(source);
    for (const field of ["title", "summary", "category", "author", "publishedAt", "slug"]) {
      if (typeof data[field] !== "string" || !data[field].trim()) {
        throw new Error(`${file}: ${field}는 비어 있지 않은 문자열이어야 합니다.`);
      }
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || slugs.has(data.slug)) {
      throw new Error(`${file}: slug 형식이 잘못되었거나 중복됩니다.`);
    }
    if (!categories.some((category) => category.id === data.category)) {
      throw new Error(`${file}: 등록되지 않은 카테고리입니다.`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.publishedAt) ||
        !Number.isFinite(Date.parse(data.publishedAt)) ||
        new Date(data.publishedAt).toISOString().slice(0, 10) !== data.publishedAt) {
      throw new Error(`${file}: 발행일은 유효한 YYYY-MM-DD 문자열이어야 합니다.`);
    }
    if (!content.trim()) throw new Error(`${file}: 본문이 비어 있습니다.`);
    if (data.image != null &&
        (typeof data.image.src !== "string" || !data.image.src.trim() ||
         typeof data.image.alt !== "string" || !data.image.alt.trim())) {
      throw new Error(`${file}: image에는 src와 alt가 필요합니다.`);
    }
    slugs.add(data.slug);
    articles.push({ ...data, image: data.image ?? null, url: `/articles/${data.slug}/`, bodyHtml: markdown.render(content) });
  }
  articles.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const featuredArticles = home.featuredArticles.map((slug) => {
    const article = articles.find((article) => article.slug === slug);
    if (!article) throw new Error(`home.json: 주요 기사 ${slug}를 찾을 수 없습니다.`);
    return { ...article, categoryName: categories.find((category) => category.id === article.category).name };
  });

  const recommendedCategories = categories.map((category) => ({
    ...category,
    articles: home.recommendedArticles[category.id].map((slug) => {
      const article = articles.find((article) => article.slug === slug);
      if (!article || article.category !== category.id) {
        throw new Error("home.json: " + category.name + " 추천 기사 " + slug + "를 확인해 주세요.");
      }
      return article;
    }),
  }));

  const popularArticles = Object.entries(articleViews).map(([slug, views]) => {
    const article = articles.find((article) => article.slug === slug);
    if (!article || !Number.isInteger(views) || views < 0) {
      throw new Error("article-views.json: " + slug + "의 기사와 샘플 조회수를 확인해 주세요.");
    }
    return { ...article, views };
  }).sort((a, b) => b.views - a.views).slice(0, 5);

  const pages = [];
  for (const device of ["pc", "mobile"]) {
    const engine = new Liquid({
      root: `${sourceDirectory}/templates/${device}`,
      layouts: `${sourceDirectory}/templates/${device}`,
      partials: `${sourceDirectory}/templates/partials`,
      extname: ".liquid",
      strictVariables: true,
      strictFilters: true,
    });
    pages.push({ url: "/", path: `${device}/index.html`, html: await engine.renderFile("index", { site, categories, articles, featuredArticles, recommendedCategories, currentCategory: "", pageTitle: "영화·책·전시·공연·음악", seo: createSeo("/", site.description) }) });
    for (const category of categories) {
      const categoryArticles = articles.filter((article) => article.category === category.id);
      const totalPages = Math.max(1, Math.ceil(categoryArticles.length / 10));
      const pageLinks = Array.from({ length: totalPages }, (_, index) => ({
        number: index + 1,
        url: index === 0 ? `/category/${category.id}/` : `/category/${category.id}/page/${index + 1}/`,
      }));
      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        const pagination = {
          total: categoryArticles.length,
          current: pageNumber,
          pages: pageLinks,
          previous: pageNumber > 1 ? pageLinks[pageNumber - 2].url : null,
          next: pageNumber < totalPages ? pageLinks[pageNumber].url : null,
        };
        pages.push({
          url: pageLinks[pageNumber - 1].url,
          path: `${device}/category/${category.id}/${pageNumber === 1 ? "" : `page/${pageNumber}/`}index.html`,
          html: await engine.renderFile("category", {
            site, categories, category, currentCategory: category.id,
            articles: categoryArticles.slice((pageNumber - 1) * 10, pageNumber * 10),
            pagination,
            seo: createSeo(pageLinks[pageNumber - 1].url, `${category.name} 기사 목록 ${pageNumber}페이지. 오늘의 문화의 ${category.name} 창작 샘플 기사를 최신순으로 소개합니다.`),
            pageTitle: `${category.name} 기사 목록${pageNumber === 1 ? "" : ` · ${pageNumber}페이지`}`,
          }),
        });
      }
    }
    for (const article of articles) {
      pages.push({
        url: article.url,
        path: `${device}/articles/${article.slug}/index.html`,
        html: await engine.renderFile("article", { site, categories, article, relatedArticles: articles.filter((candidate) => candidate.category === article.category && candidate.slug !== article.slug).slice(0, 3), popularArticles, currentCategory: article.category, category: categories.find((category) => category.id === article.category), pageTitle: article.title, seo: createSeo(article.url, article.summary, article) }),
      });
    }
  }

  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await cp(`${sourceDirectory}/assets`, `${outputDirectory}/assets`, {
    recursive: true,
    filter: (path) => !path.endsWith(".gitkeep"),
  });
  for (const page of pages) {
    const path = `${outputDirectory}/${page.path}`;
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, page.html);
  }
  const publicUrls = [...new Set(pages.map((page) => new URL(page.url, origin).href))];
  const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    publicUrls.map((url) => `  <url><loc>${url.replace(/&/g, "&amp;")}</loc></url>`).join("\n") +
    "\n</urlset>\n";
  await writeFile(`${outputDirectory}/sitemap.xml`, sitemap);
  await writeFile(`${outputDirectory}/robots.txt`, noindex
    ? "User-agent: *\nAllow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", origin).href}\n`);
  console.log(`빌드 완료: 기사 ${articles.length}개, 페이지 ${pages.length}개 → dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await build();
}
