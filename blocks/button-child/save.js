// button/save.js
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
  const blockProps = useBlockProps.save();

  return (
    <div { ...blockProps }>
      <RichText.Content
        tagName="a"
        value={ attributes.text }
        className="amjl-button-link"
      />
    </div>
  );
}
