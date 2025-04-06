import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps({ className: 'swiper-slide' });

	return (
		<div {...blockProps}>
			<InnerBlocks
				template={[['core/paragraph', { placeholder: 'Slide-Inhalt hier…' }]]}
				templateLock={false}
			/>
		</div>
	);
}
