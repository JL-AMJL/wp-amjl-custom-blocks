import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { generateClassName, generateDataAttributes, generateStyles } from './utils';

export default function save({ attributes }) {

	const style = generateStyles(attributes);
    const className = generateClassName(attributes);
    const dataAttributes = generateDataAttributes(attributes);

    const blockProps = useBlockProps.save({
    style,
    className,
    ...(dataAttributes)
    });

    return (
        <div {...blockProps} >
            <div className="swiper-wrapper">
                {/* Die InnerBlocks.Content sorgt dafür, dass die inneren Slides gespeichert werden */}
                <InnerBlocks.Content />
            </div>
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
    );
}
