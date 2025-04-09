import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { useEffect, useRef, useMemo } from '@wordpress/element';
import { 
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	Tooltip
} from '@wordpress/components';
import { justifyStretch, alignLeft, alignRight, alignCenter } from '@wordpress/icons';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);

export default function Edit({ attributes, setAttributes }) {
	const { 
		autoplay, 
		autoplaySpeed, 
		isLoop, 
		slidesPerView, 
		showNavigation, 
		showPagination, 
		align, 
		height,
		navigationPosition,
		navigationOffsetX,
		navigationOffsetY
	} = attributes;

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

	const style = {
		...(height ? { height } : {}),
		...(navigationOffsetX ? { '--swiper-navigation-sides-offset': `${navigationOffsetX}px` } : {}),
		...(navigationOffsetY ? { '--swiper-navigation-top-offset': `${navigationOffsetY}px` } : {})
	};
	
	const baseProps = useBlockProps({ style });

	const blockProps = {
		...baseProps,
		className: `${baseProps.className} swiper swiper-container ${align}{showNavigation ? ' has-swiper-navigation' : ''}${showPagination ? ' has-swiper-pagination' : ''}${navigationPosition ? ` nav-position-${navigationPosition}` : ''}`
	};

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

                        {/* Höhe */}
						<UnitControl
							label={__('Höhe', 'wp-amjl-custom-blocks')}
							value={height}
							onChange={(value) => setAttributes({ height: value })}
							units={[
								{ value: 'px', label: 'px' },
								{ value: '%', label: '%' },
								{ value: 'vh', label: 'vh' },
								{ value: 'vw', label: 'vw' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' }
							]}
							isUnitSelectTabbable
							__nextHasNoMarginBottom
						/>

						{/* Align Einstellungen (wide/full) */}
						<SelectControl
    						label={__('Ausrichtung', 'wp-amjl-custom-blocks')}
    						value={align}
    						onChange={(value) => setAttributes({ align: value })}
    						options={[
    							{ label: __('Standard', 'wp-amjl-custom-blocks'), value: '' },
    							{ label: __('Breit (Wide)', 'wp-amjl-custom-blocks'), value: 'alignwide' },
    							{ label: __('Vollbreite (Full)', 'wp-amjl-custom-blocks'), value: 'alignfull' }
    						]}
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
				<PanelBody title={__('Navigation & Pagination', 'wp-amjl-custom-blocks')} initialOpen={false}>
					<ToggleGroupControl
						label={__('Position Presets', 'wp-amjl-custom-blocks')}
						value={navigationPosition}
						onChange={(value) => setAttributes({ navigationPosition: value })}
						isBlock
					>
						<ToggleGroupControlOption value="standard" label="Standard" icon={justifyStretch} />
						<ToggleGroupControlOption value="bottom-center" label="Unten Mitte" icon={alignCenter} />
						<ToggleGroupControlOption value="bottom-left" label="Unten Links" icon={alignLeft}/>
						<ToggleGroupControlOption value="bottom-right" label="Unten Rechts" icon= {alignRight}/>
					</ToggleGroupControl>
					<RangeControl
						label={__('X-Verschiebung (px)', 'wp-amjl-custom-blocks')}
						value={navigationOffsetX}
						onChange={(value) => setAttributes({ navigationOffsetX: value })}
						min={-200}
						max={200}
					/>
					<RangeControl
						label={__('Y-Verschiebung (px)', 'wp-amjl-custom-blocks')}
						value={navigationOffsetY}
						onChange={(value) => setAttributes({ navigationOffsetY: value })}
						min={-200}
						max={200}
					/>
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
