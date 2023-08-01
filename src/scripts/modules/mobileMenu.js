function closeMenu(burgerIcon, navigationMenu, menuBackground) {
    burgerIcon.classList.remove('open');
    navigationMenu.classList.remove('open');
    menuBackground.classList.remove('open');
    document.body.style.overflowY = 'auto';
}

function openMenu(burgerIcon, navigationMenu, menuBackground) {
    burgerIcon.classList.add('open');
    navigationMenu.classList.add('open');
    menuBackground.classList.add('open');
    document.body.style.overflowY = 'hidden';
}

export function mobileMenu() {
    const burgerIcon = document.querySelector('.header__burger');
    const navigationMenu = document.querySelector('.header__navbar');
    const menuBackground = document.querySelector('.header__bg');

    burgerIcon.addEventListener('click', ({ target }) => {
        const isOpen = target.classList.contains('open') || target.parentNode.classList.contains('open');
        isOpen ? closeMenu(burgerIcon, navigationMenu, menuBackground) : openMenu(burgerIcon, navigationMenu, menuBackground);
    });

    navigationMenu.addEventListener('click', ({ target }) => {
        if (target.classList.contains('header__navbar-nav__link') || target.classList.contains('header__logo-img')) {
            closeMenu(burgerIcon, navigationMenu, menuBackground);
        }
    });
}

