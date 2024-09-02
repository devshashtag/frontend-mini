const navToggle = document.querySelector('.navbar-toggle');
const navbar = document.querySelector('.header > .navbar');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navbar.classList.toggle('active');
});
