import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { icon } = attributes;

    console.log('Attributes in save function:', attributes);

    return (
        <div {...useBlockProps.save()}>
            <div className="amjl-icon">
                {icon && <img src={icon} alt="Icon" />}
            </div>
        </div>
    );
}