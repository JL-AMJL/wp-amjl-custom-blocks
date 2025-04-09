import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import Swiper from 'swiper';

export function useIsSwiperReady(clientId) {
	return useSelect((select) => {
		const { getBlock } = select('core/block-editor');
		const block = getBlock(clientId);
		return block?.innerBlocks?.length > 0;
	}, [clientId]);
}



export const useInitializeSwiper = ({
	ref,
	isLoop,
	slidesPerView,
	showNavigation,
	showPagination,
	dependencies = [],
}) => {
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const wrapper = el.querySelector('.swiper-wrapper');
		if (!wrapper || (isLoop && wrapper.children.length < 2)) return;

		if (el.swiper) {
			el.swiper.destroy();
		}

		const instance = new Swiper(el, {
			slidesPerView,
			autoplay: false,
			loop: isLoop,
			...(showNavigation && {
				navigation: {
					prevEl: el.querySelector('.swiper-button-prev'),
					nextEl: el.querySelector('.swiper-button-next'),
				}
			}),
			...(showPagination && {
				pagination: {
					el: el.querySelector('.swiper-pagination'),
					clickable: true,
				}
			})
		});

		if (showPagination) {
			setTimeout(() => {
				instance.pagination?.render?.();
				instance.pagination?.update?.();
			}, 500);
		}

		return () => {
			if (el.swiper) {
				el.swiper.destroy();
			}
		};
	}, [ref, isLoop, slidesPerView, showNavigation, showPagination, ...dependencies]);
};