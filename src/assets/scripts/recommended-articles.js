const recommended = document.querySelector("[data-recommended]");

if (recommended) {
  const tabList = recommended.querySelector("[data-tabs]");
  const tabs = [...recommended.querySelectorAll("[data-tab]")];
  const panels = [...recommended.querySelectorAll("[data-panel]")];
  tabList.hidden = false;
  tabList.setAttribute("role", "tablist");
  tabList.setAttribute("aria-label", "추천 기사 카테고리");

  function select(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  }

  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", tab.id);
    panels[index].querySelector(".recommended-category").hidden = true;
    tab.addEventListener("click", () => select(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });
  select(0);
}
