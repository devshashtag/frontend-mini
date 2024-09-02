const nav_toggle = document.querySelector('.nav-toggle');
const nav_list = document.querySelector('.nav-list');

nav_toggle.addEventListener('click', () => {
  nav_toggle.classList.toggle('change');
  nav_list.classList.toggle('show');
});
