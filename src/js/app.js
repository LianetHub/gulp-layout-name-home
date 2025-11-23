"use strict";

//  Fancybox
if (typeof Fancybox !== "undefined" && Fancybox !== null) {
    Fancybox.bind("[data-fancybox]", {
        dragToClose: false
    });
}

document.addEventListener("DOMContentLoaded", () => {


    document.addEventListener('click', (e) => {
        const target = e.target;


        const header = document.querySelector('.header');
        const catalogToggler = document.querySelector('.header__catalog-toggler');
        const body = document.body;


        if (target.closest('.header__catalog-toggler')) {
            catalogToggler.classList.toggle('active');
            header.classList.toggle('open-catalog');
            body.classList.toggle('lock-catalog');
            return;
        }

        if (header?.classList.contains('open-catalog') && !target.closest('.header')) {
            catalogToggler.classList.remove('active');
            header.classList.remove('open-catalog');
            body.classList.remove('lock-catalog');
        }

        if (target.closest('.icon-menu') || target.classList.contains('header__menu')) {
            header.classList.toggle('open-menu');
            body.classList.toggle('lock-menu');
        }

        if (header?.classList.contains('open-menu') && !target.closest('.header')) {
            header.classList.remove('open-menu');
            body.classList.remove('lock-menu');
        }

        if (target.matches('.header__search-toggler')) {
            header.classList.add('open-mobile-search');
            document.querySelector('.search__input').focus()
        }


        if (target.classList.contains('menu__arrow')) {
            const subMenu = target.nextElementSibling;

            if (subMenu.classList.contains('open')) {
                subMenu.classList.remove('open');
                target.classList.remove('active');
            } else {
                closeAllMenus();
                subMenu.classList.add('open');
                target.classList.add('active');
            }
        }

        if (target.matches('.product__compare')) {
            target.classList.toggle('active')
        }


    });

    document.querySelector('.search__input')?.addEventListener('blur', function () {
        document.querySelector('.header')?.classList.remove('open-mobile-search')
    })

    function closeAllMenus() {
        document.querySelectorAll('.submenu.open').forEach(menu => {
            menu.classList.remove('open');
            const button = menu.previousElementSibling;
            if (button && button.classList.contains('menu__arrow')) {
                button.classList.remove('active');
            }
        });


    }

    // sliders

    if (document.querySelector('.header__menu')) {
        new Swiper('.header__menu', {
            slidesPerView: "auto",
            spaceBetween: 20,

        })
    }

    if (document.querySelector('.promo__slider')) {
        new Swiper('.promo__slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: ".promo__next",
                prevEl: ".promo__prev"
            },
            pagination: {
                el: '.promo__pagination',
                clickable: true
            }
        })
    }

    if (document.querySelector('.about__licenses-slider')) {
        new Swiper('.about__licenses-slider', {
            slidesPerView: 1,
            navigation: {
                nextEl: ".about__licenses-next",
                prevEl: ".about__licenses-prev"
            },
            pagination: {
                el: '.about__licenses-pagination',
                clickable: true
            }
        })
    }


});