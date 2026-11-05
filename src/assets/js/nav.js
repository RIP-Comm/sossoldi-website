/* Site navigation: mobile sheet. */
(() => {
  const button = document.querySelector(".menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;

  const setOpen = (open) => {
    if (open) menu.removeAttribute("hidden");
    else menu.setAttribute("hidden", "");
    button.setAttribute("aria-expanded", String(open));
  };

  button.addEventListener("click", () => setOpen(menu.hasAttribute("hidden")));
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hasAttribute("hidden")) setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (menu.hasAttribute("hidden")) return;
    if (!menu.contains(event.target) && !button.contains(event.target)) setOpen(false);
  });
})();
