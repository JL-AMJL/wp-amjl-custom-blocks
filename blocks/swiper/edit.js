import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import Swiper from 'swiper';
import 'swiper/css';

export default function Edit() {
	const wrapperRef = useRef(null);

	const blockProps = useBlockProps({ className: 'swiper swiper-container' });

	const slideTemplate = [
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
	];

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: ['amjl/swiper-slide'],
			template: slideTemplate,
			templateLock: false,
		}
	);

	useEffect(() => {
		console.log('📦 useEffect läuft');
		const el = wrapperRef.current;

		if (el && !el.classList.contains('swiper-initialized')) {
			console.log('🚀 Initialisiere Swiper');
			new Swiper(el, {
				slidesPerView: 1,
				loop: false,
			});
		}
	}, []);

	return (
		<div {...blockProps} ref={wrapperRef}>
			<div {...innerBlocksProps} />
		</div>
	);
}
