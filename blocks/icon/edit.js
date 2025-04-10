import { useBlockProps } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const { icon } = attributes;

    return (
        <div {...useBlockProps()}>
            <div className="amjl-icon">
                {icon ? (
                    <img src={icon} alt="Icon" />
                ) : (
                    <span>No icon selected</span>
                )}
            </div>
        </div>
    );
}