import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Autoplay]);

document.addEventListener('DOMContentLoaded', () => {
    const swiperElements = document.querySelectorAll('.swiper-container');

    swiperElements.forEach(el => {
        const autoplay = el.dataset.autoplay === 'true';
        const autoplaySpeed = parseInt(el.dataset.autoplaySpeed || '3000', 10);
        const slidesPerView = parseInt(el.dataset.slidesPerView || '1', 10);
        const loop = el.dataset.loop === 'true';

        const hasNavigation = el.classList.contains('has-swiper-navigation');
        const hasPagination = el.classList.contains('has-swiper-pagination');

        const swiper = new Swiper(el, {
            slidesPerView: slidesPerView,
            loop: loop,
            autoplay: autoplay ? { delay: autoplaySpeed } : false,
            ...(hasNavigation && {
                navigation: {
                    prevEl: el.querySelector('.swiper-button-prev'),
                    nextEl: el.querySelector('.swiper-button-next'),
                }
            }),
            ...(hasPagination && {
                pagination: {
                    el: el.querySelector('.swiper-pagination'),
                    clickable: true,
                }
            })
        });
    });
});
