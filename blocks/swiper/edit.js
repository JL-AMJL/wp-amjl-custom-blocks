import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import Swiper from 'swiper';
import 'swiper/css';

export default function Edit() {
	const blockProps = useBlockProps();
    const swiperRef = useRef(null);

    useEffect(() => {
        console.log('📦 useEffect läuft');
        const el = swiperRef.current;
    
        if (el && !el.classList.contains('swiper-initialized')) {
            console.log('🚀 Initialisiere Swiper');
            new Swiper(el, {
                slidesPerView: 1,
                loop: false,
            });
        }
    }, []);
    
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

	return (
		<div {...blockProps} className="swiper swiper-container" ref={swiperRef}>
			<div className="swiper-wrapper">
				<InnerBlocks
					allowedBlocks={['amjl/swiper-slide']}
					template={slideTemplate}
					templateLock={false}
				/>
			</div>
		</div>
	);
}
