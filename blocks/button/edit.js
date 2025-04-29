// button/edit.js
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
  const blockProps = useBlockProps();

  return (
    <div { ...blockProps }>
      <RichText
        tagName="a"
        value={ attributes.text }
        onChange={ ( value ) => setAttributes( { text: value } ) }
        placeholder="Button Text..."
        className="amjl-button-link"
      />
    </div>
  );
}
