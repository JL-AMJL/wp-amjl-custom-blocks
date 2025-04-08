import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { PanelBody, ToggleControl, TextControl, RangeControl } from '@wordpress/components';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);

export default function Edit({ attributes, setAttributes }) {
	const { autoplay, autoplaySpeed, isLoop, slidesPerView, showNavigation, showPagination } = attributes;

	const slideTemplate = useMemo(() => [
		[
			'amjl/swiper-slide',
			{},
			[['core/paragraph', { placeholder: 'Text für Slide 1' }]]
		],
		[
			'amjl/swiper-slide',
			{},
			[['core/paragraph', { placeholder: 'Text für Slide 2' }]]
		]
	], []);

	const blockProps = useBlockProps({
		className: `swiper swiper-container${showNavigation ? ' has-swiper-navigation' : ''}${showPagination ? ' has-swiper-pagination' : ''}`
	});
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: ['amjl/swiper-slide'],
			template: slideTemplate,
			templateLock: false,
		}
	);

	// useEffect für Swiper.
	const wrapperRef = useRef(null);

	useEffect(() => {
		const el = wrapperRef.current;
		if (!el) return;

		if (el.swiper) {
			el.swiper.destroy();
		}

		// Swiper neu initialisieren
		const instance = new Swiper(el, {
			slidesPerView: slidesPerView,
			autoplay: false,
			loop: isLoop ? true : false,
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
				const paginationEl = wrapperRef.current?.querySelector('.swiper-pagination');
				instance.pagination?.render?.();
				instance.pagination?.update?.();
			}, 500);
		}

		// Cleanup bei Unmount
		return () => {
			if (el.swiper) {
				el.swiper.destroy();
			}
		};
	}, [isLoop, slidesPerView, showNavigation, showPagination]);

	return (
		<>
			{/* Swiper Block Inspector Controls*/}
			<InspectorControls>
				<PanelBody>
					<div className="swiper-settings">
						<h3>{__('Slider Einstellungen', 'wp-amjl-custom-blocks')}</h3>

						{/* Autoplay Toggle */}
						<ToggleControl
							label={__('Autoplay', 'wp-amjl-custom-blocks')}
							checked={autoplay}
							onChange={(value) => setAttributes({ autoplay: value })}
						/>

						{autoplay && (
							<RangeControl
								label={__('Autoplay Speed (ms)', 'wp-amjl-custom-blocks')}
								value={autoplaySpeed}
								onChange={(value) => setAttributes({ autoplaySpeed: value })}
								min={0}
								max={10000}
								step={1}
							/>
						)}

						{/* Loop Toggle */}
						<ToggleControl
							label={__('Loop', 'wp-amjl-custom-blocks')}
							checked={isLoop}
							onChange={(value) => setAttributes({ isLoop: value })}
						/>

						{/* Slideanzahl (Slides per View) */}
						<RangeControl
							label={__('Slideanzahl', 'wp-amjl-custom-blocks')}
							value={slidesPerView}
							onChange={(value) => setAttributes({ slidesPerView: value })}
							min={1}
							max={10}
						/>

						<h3>{__('Navigation Einstellungen', 'wp-amjl-custom-blocks')}</h3>

						{/* Navigation Arrows Toggle */}
						<ToggleControl
							label={__('Navigation Arrows', 'wp-amjl-custom-blocks')}
							checked={showNavigation}
							onChange={(value) => setAttributes({ showNavigation: value })}
						/>

						{/* Pagination Toggle */}
						<ToggleControl
							label={__('Pagination', 'wp-amjl-custom-blocks')}
							checked={showPagination}
							onChange={(value) => setAttributes({ showPagination: value })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			{/* Swiper Block Rendering */}
			<div {...blockProps} ref={wrapperRef}>
				<div {...innerBlocksProps} />
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
		</>
	);
}
