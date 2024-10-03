//* set evebts when page loaded
window.addEventListener('DOMContentLoaded', function () {
  const sideBarNav = document.querySelector('.sidebar .sidebar__nav');

  // functions
  const isBtnSelectable = (target) => {
    const parent = target.parentNode;
    const isSelectable = (element) => {
      return element.classList.contains('nav__btn') && !element.classList.contains('is-active');
    };

    if (isSelectable(target)) return target;
    if (isSelectable(parent)) return parent;
  };

  const removeActiveClass = (className) => document.querySelector(className).classList.remove('is-active');

  sideBarNav.addEventListener('click', (e) => {
    let target = isBtnSelectable(e.target);

    if (!target) return;

    // remove active class from button and page
    removeActiveClass('.nav__btn.is-active');
    removeActiveClass('.page.is-active');

    // add active class to button and page
    const page = document.getElementById(target.dataset.page);

    target.classList.add('is-active');
    page.classList.add('is-active');
  });
});
