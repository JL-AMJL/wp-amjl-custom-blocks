import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

Swiper.use([Navigation, Pagination]);

/**
 * Generate the style object from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @returns {Object} The style object.
 */
export function generateStyles(attributes) {
    const {
        height,
        navigationOffsetX,
        navigationOffsetY,
        navigationSize,
        paginationOffsetY,
        paginationBulletSize,
        paginationBulletHorizontalGap,
        paginationBulletVerticalGap,
        navigationColor,
        navigationHoverColor,
        paginationActiveColor,
        paginationInactiveColor,
        paginationInactiveOpacity,
    } = attributes;

    return {
        ...(height ? { height } : {}),
        ...(navigationOffsetX ? { '--swiper-navigation-sides-offset': `${navigationOffsetX}px` } : {}),
        ...(navigationOffsetY ? { '--swiper-navigation-top-offset': `${navigationOffsetY}px` } : {}),
        ...(navigationSize ? { '--swiper-navigation-size': `${navigationSize}` } : {}),
        ...(paginationOffsetY ? { '--swiper-pagination-bottom': `${paginationOffsetY}px` } : {}),
        ...(paginationBulletSize ? { '--swiper-pagination-bullet-size': `${paginationBulletSize}` } : {}),
        ...(paginationBulletHorizontalGap ? { '--swiper-pagination-bullet-horizontal-gap': `${paginationBulletHorizontalGap}px` } : {}),
        ...(paginationBulletVerticalGap ? { '--swiper-pagination-bullet-vertical-gap': `${paginationBulletVerticalGap}px` } : {}),
        ...(navigationColor ? { '--swiper-navigation-color': `${navigationColor}` } : {}),
        ...(navigationHoverColor ? { '--amjl-swiper-navigation-hover-color': `${navigationHoverColor}` } : {}),
        ...(paginationActiveColor ? { '--swiper-pagination-color': `${paginationActiveColor}` } : {}),
        ...(paginationInactiveColor ? { '--swiper-pagination-bullet-inactive-color': `${paginationInactiveColor}` } : {}),
        ...(paginationInactiveOpacity ? { '--swiper-pagination-bullet-inactive-opacity': `${paginationInactiveOpacity}` } : {}),
    };
}

/**
 * Generate the className string from attributes.
 *
 * @param {Object} attributes Block attributes.
 * @returns {string} The className string.
 */
export function generateClassName(attributes) {
    const {
        align,
        showNavigation,
        showPagination,
        navigationPosition,
    } = attributes;

    return [
        'swiper swiper-container',
        align,
        showNavigation ? 'has-swiper-navigation' : '',
        showPagination ? 'has-swiper-pagination' : '',
        navigationPosition ? `nav-position-${navigationPosition}` : '',
    ].filter(Boolean).join(' ');
}

/**
 * Generate data-* attributes for the block.
 *
 * @param {Object} attributes Block attributes.
 * @returns {Object} An object containing data-* attributes.
 */
export function generateDataAttributes(attributes) {
    const {
        autoplay,
        autoplaySpeed,
        slidesPerView,
        isLoop,
    } = attributes;

    return {
        'data-autoplay': autoplay,
        'data-autoplay-speed': autoplaySpeed,
        'data-slides-per-view': slidesPerView,
        'data-loop': isLoop,
    };
}

/**
 * Initialisiert eine Swiper-Instanz im Gutenberg-Editor.
 *
 * Diese Funktion sorgt dafür, dass der Swiper korrekt mit Navigation und Pagination 
 * (wenn aktiviert) initialisiert und bei Bedarf neu geladen wird.
 *
 * @param {Object} params
 * @param {React.RefObject} params.ref - Der Ref zum Swiper-Container.
 * @param {string} params.clientId - Die Block-ID (optional für spätere Erweiterungen).
 * @param {boolean} params.isLoop - Aktiviert die Loop-Funktionalität.
 * @param {number} params.slidesPerView - Anzahl sichtbarer Slides.
 * @param {boolean} params.showNavigation - Zeigt Navigationselemente (Pfeile).
 * @param {boolean} params.showPagination - Zeigt Pagination-Bullets.
 */
export const useInitSwiper = ({
	clientId,
	ref,
	attributes
}) => {
	const {
		isLoop,
		slidesPerView,
		showNavigation,
		showPagination,
	} = attributes;

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
