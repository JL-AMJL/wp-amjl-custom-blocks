import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { useInitSwiper, generateStyles, generateClassName } from './utils';
import { slideTemplate } from './slide-template';
import SwiperSettingsPanel from './settings-panel';
import SwiperStylesPanel from './styles-panel';

export default function Edit({ attributes, setAttributes, clientId }) {

	/**
	 * Generate Style and ClassName
	 */
	const style = generateStyles(attributes);
	const className = generateClassName(attributes);
	
	/**
	 * blockProps
	 */
	const blockProps = useBlockProps({
		style,
		className
	});

	/**
	 * Inner Block Props
	 */
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: ['amjl/swiper-slide'],
			template: slideTemplate,
			templateLock: false,
		}
	);

	/**
	 * Initialize Swiper
	 */
	const wrapperRef = useRef(null);

	useEffect(() => {
		if (wrapperRef.current) {
			const styles= generateStyles(attributes);
			if (styles.height) {
				wrapperRef.current.style.height = styles.height;
			}
		}
	}, [attributes.height, attributes.showNavigation, attributes.showPagination, attributes.isLoop]);

	useInitSwiper({
		clientId,
		ref: wrapperRef,
		attributes
	});

	return (
		<>
			{/* Swiper Block Inspector Controls*/}
			<SwiperSettingsPanel attributes={attributes} setAttributes={setAttributes} />
			<SwiperStylesPanel attributes={attributes} setAttributes={setAttributes} />
			

			{/* Swiper Block Rendering */}
			<div {...blockProps} ref={wrapperRef}>
				<div {...innerBlocksProps} />
				{attributes.showNavigation && (
				<div className="swiper-button-prev"></div>
				)}
				{attributes.showNavigation && (
					<div className="swiper-button-next"></div>
				)}
				{attributes.showPagination && (
					<div className="swiper-pagination"></div>
				)}	
			</div>
		</>
	);
}
