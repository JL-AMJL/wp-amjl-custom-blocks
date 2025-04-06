import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

// Lokaler Swiper-Code
import '../../js/swiper-bundle.min.js';

export default function Edit() {
	const blockProps = useBlockProps();

    useEffect(() => {
		const container = document.querySelector('.wp-block-amjl-swiper .wiper');
        
        // Nur initialisieren, wenn Swiper global verfügbar ist
		if (container && ! container.classList.contains('swiper-initialized')) {
			new window.Swiper('.wp-block-amjl-swiper .swiper', {
				slidesPerView: 1,
				loop: false,
			});
		}
	}, []);

	const slideTemplate = [
		[
			'core/group',
			{
				className: 'swiper-slide',
			},
			[
				['core/paragraph', { placeholder: __('Text für Slide 1', 'wp-amjl-custom-blocks') }],
			],
		],
		[
			'core/group',
			{
				className: 'swiper-slide',
			},
			[
				['core/paragraph', { placeholder: __('Text für Slide 2', 'wp-amjl-custom-blocks') }],
			],
		],
	];

	return (
		<div {...blockProps} className="swiper swiper-container">
			<div className="swiper-wrapper">
				<InnerBlocks
					allowedBlocks={['core/group']}
					template={slideTemplate}
					templateLock={false}
				/>
			</div>
		</div>
	);
}
