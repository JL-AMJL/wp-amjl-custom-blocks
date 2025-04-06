import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps({ className: 'swiper-slide' });

	return (
		<div {...blockProps}>
			<InnerBlocks />
		</div>
	);
}
