import { useSelect } from '@wordpress/data';
import { useBlockProps, InnerBlocks, getBlockAttributes } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		autoplay,
		autoplaySpeed,
		slidesPerView,
		showNavigation,
		showPagination,
		isLoop,
		align,
		height,
		navigationPosition,
		navigationOffsetX,
		navigationOffsetY
	} = attributes;

	const style = {
        ...(height ? { height } : {}),
        ...(navigationOffsetX ? { '--swiper-navigation-sides-offset': `${navigationOffsetX}px` } : {}),
        ...(navigationOffsetY ? { '--swiper-navigation-top-offset': `${navigationOffsetY}px` } : {})
    };    

    const blockProps = useBlockProps.save({
    className: [
        'swiper swiper-container',
        align,
        showNavigation ? 'has-swiper-navigation' : '',
        showPagination ? 'has-swiper-pagination' : '',
        navigationPosition ? `nav-position-${navigationPosition}` : ''
    ].filter(Boolean).join(' '),
    style: Object.keys(style).length ? style : undefined,
    'data-autoplay': autoplay,
    'data-autoplay-speed': autoplaySpeed,
    'data-slides-per-view': slidesPerView,
    'data-loop': isLoop,
});

    return (
        <div {...blockProps} >
            <div className="swiper-wrapper">
                {/* Die InnerBlocks.Content sorgt dafür, dass die inneren Slides gespeichert werden */}
                <InnerBlocks.Content />
            </div>
            {showNavigation && (
            <div className="swiper-button-prev"></div>
            )}

            {showNavigation && (
                <div className="swiper-button-next"></div>
            )}

            {showPagination && (
                <div className="swiper-pagination"></div>
            )}
        </div>
    );
}
