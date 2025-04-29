// buttons/edit.js
import { InnerBlocks } from '@wordpress/block-editor';

console.log( 'Buttons block Edit() loaded!' );

export default function Edit() {
  const TEMPLATE = [
    [ 'amjl/button-child', {} ],
  ];

  return (
    <div className="amjl-buttons">
      <InnerBlocks
        allowedBlocks={[ 'amjl/button-child' ]}
        template={TEMPLATE}
        templateLock={false}
        orientation="horizontal"
      />
    </div>
  );
}
