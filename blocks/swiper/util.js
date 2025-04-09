import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import Swiper from 'swiper';

export const useInitSwiper = ({
	clientId,
	ref,
	isLoop,
	slidesPerView,
	showNavigation,
	showPagination
}) => {
	const hasInnerBlocks = useSelect(
		(select) => {
			const block = select(blockEditorStore).getBlock(clientId);
			return block?.innerBlocks?.length > 0;
		},
		[clientId]
	);

	useEffect(() => {
		if (!hasInnerBlocks || !ref.current) return;

		const el = ref.current;

		const frame = requestAnimationFrame(() => {
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
		});

		return () => {
			cancelAnimationFrame(frame);
			if (ref.current?.swiper) {
				ref.current.swiper.destroy();
			}
		};
	}, [hasInnerBlocks, ref, isLoop, slidesPerView, showNavigation, showPagination]);
};
