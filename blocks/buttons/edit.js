// buttons/edit.js
import { InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
  return (
    <div className="amjl-buttons">
      <InnerBlocks
        allowedBlocks={[ 'amjl/button' ]}
        orientation="horizontal"
        templateLock={false}
      />
    </div>
  );
}