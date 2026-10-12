const header = document.querySelector("[data-mobile-header]");
const toggle = header.querySelector(".menu-toggle");
const navigation = header.querySelector(".mobile-navigation");
const label = toggle.querySelector("span");

function setMenuOpen(open) {
  toggle.setAttribute("aria-expanded", String(open));
  navigation.hidden = !open;
  label.textContent = open ? "닫기" : "메뉴";
}

setMenuOpen(false);
toggle.hidden = false;

toggle.addEventListener("click", () => {
  setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
});

header.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    toggle.focus();
  }
});
