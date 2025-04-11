import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { selectedIcon } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div className="amjl-icon">
                {selectedIcon && (
                    <i className={`fas fa-${selectedIcon}`}></i>
                )}
            </div>
        </div>
    );
}