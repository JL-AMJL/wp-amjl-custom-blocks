import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps} className="swiper swiper-container">
			<div className="swiper-wrapper">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

