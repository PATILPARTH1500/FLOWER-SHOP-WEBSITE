document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav .right ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.classList.add('animate__animated', 'animate__rubberBand');
        });
        link.addEventListener('animationend', () => {
            link.classList.remove('animate__animated', 'animate__rubberBand');
        });
    });
});
