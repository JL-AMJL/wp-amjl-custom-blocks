import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { selectedIcon, iconSize, iconColorSlug } = attributes;

    const lastDash = selectedIcon?.lastIndexOf('-') ?? -1;
    const baseIcon = selectedIcon?.slice(0, lastDash);
    const style = selectedIcon?.slice(lastDash + 1);
    const styleClassMap = {
        solid: 's',
        regular: 'r',
        brands: 'b',
    };
    const styleClass = styleClassMap[style];

    return (
        <div {...useBlockProps.save()}>
            {selectedIcon && (
                <i
                    className={`amjl-${styleClass} amjl-${baseIcon} has-text-color has-${iconColorSlug}-color`}
                    style={{ fontSize: iconSize }}
                ></i>
            )}
        </div>
    );
}
