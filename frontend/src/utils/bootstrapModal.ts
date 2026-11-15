/**
 * Closes any open Bootstrap modal without waiting for its hide transition.
 * Needed when a modal button navigates to another route: the route change would otherwise
 * leave the backdrop and the body scroll lock behind.
 */
export const dismissBootstrapModals = () => {
  document.querySelectorAll(".modal.show").forEach((modal) => modal.classList.remove("show"));
  document.querySelectorAll(".modal-backdrop").forEach((backdrop) => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
};
