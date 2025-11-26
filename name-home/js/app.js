"use strict";

if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const body = document.body;
    const overlay = document.querySelector('.header__overlay');
    const menuParents = document.querySelectorAll('.menu__item--parent');
    const headerAddress = document.querySelector('.header__address');

    function openOverlay(submenu) {
        header.classList.add('submenu-open');
        const headerHeight = header.offsetHeight;
        const submenuHeight = submenu.offsetHeight;
        overlay.style.height = `${headerHeight + submenuHeight}px`;
    }

    function closeOverlay() {
        header.classList.remove('submenu-open');
        overlay.style.height = `${header.offsetHeight}px`;
    }

    function closeAllMenus() {
        document.querySelectorAll('.menu__item--parent.is-clicked').forEach(parent => {
            parent.classList.remove('is-clicked');
        });

        document.querySelectorAll('.submenu.open').forEach(menu => {
            menu.classList.remove('open');
            const button = menu.previousElementSibling;
            if (button && button.classList.contains('menu__arrow')) {
                button.classList.remove('active');
            }
        });
        closeOverlay();
    }

    function checkScroll() {
        if (window.scrollY > 0) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }
    }

    checkScroll();

    if (window.matchMedia('(any-hover: hover)').matches) {
        menuParents.forEach(parent => {
            const submenu = parent.querySelector('.submenu');
            const arrow = parent.querySelector('.menu__arrow');

            parent.addEventListener('mouseenter', () => {
                if (submenu && !header.classList.contains('open-menu')) {
                    const currentlyClicked = document.querySelector('.menu__item--parent.is-clicked');
                    if (currentlyClicked && currentlyClicked !== parent) {
                        closeAllMenus();
                    }

                    submenu.classList.add('open');
                    if (arrow) arrow.classList.add('active');
                    openOverlay(submenu);
                }
            });

            parent.addEventListener('mouseleave', () => {
                if (parent.classList.contains('is-clicked')) return;

                if (!header.classList.contains('open-menu')) {
                    if (submenu) submenu.classList.remove('open');
                    if (arrow) arrow.classList.remove('active');
                    closeOverlay();
                }
            });
        });
    }

    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.icon-menu') || target.classList.contains('header__menu')) {
            header.classList.toggle('open-menu');
            body.classList.toggle('lock-menu');
            if (!header.classList.contains('open-menu')) {
                closeAllMenus();
            }
        }

        if (header?.classList.contains('open-menu') && !target.closest('.header')) {
            header.classList.remove('open-menu');
            body.classList.remove('lock-menu');
            closeAllMenus();
        }

        if (!target.closest('.header')) {
            closeAllMenus();
        }

        if (target.classList.contains('menu__arrow')) {
            const subMenu = target.nextElementSibling;
            const parent = target.closest('.menu__item--parent');

            if (parent.classList.contains('is-clicked')) {
                parent.classList.remove('is-clicked');
                subMenu.classList.remove('open');
                target.classList.remove('active');
                closeOverlay();
            } else {
                closeAllMenus();
                parent.classList.add('is-clicked');
                subMenu.classList.add('open');
                target.classList.add('active');
                openOverlay(subMenu);
            }
        }

        if (headerAddress && target.closest('.header__address')) {
            if (!window.matchMedia('(any-hover: hover)').matches) {
                headerAddress.classList.toggle('is-active');
            }
        } else if (headerAddress && headerAddress.classList.contains('is-active')) {
            headerAddress.classList.remove('is-active');
        }
    });

    window.addEventListener('resize', () => {
        closeAllMenus();
        if (header.classList.contains('open-menu')) {
            header.classList.remove('open-menu');
            body.classList.remove('lock-menu');
        }
        if (headerAddress) {
            headerAddress.classList.remove('is-active');
        }
    });

    window.addEventListener('scroll', checkScroll);
});