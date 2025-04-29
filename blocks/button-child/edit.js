// button-child/edit.js
import { RichText, useBlockProps, InspectorControls, BlockControls, AlignmentControl } from '@wordpress/block-editor';
import { ToolbarButton, Popover, TextControl, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { __, sprintf } from '@wordpress/i18n';

function WidthPanel( { selectedWidth, setAttributes } ) {
  return (
    <ToolsPanel
      label={ __( 'Settings' ) }
      resetAll={ () => setAttributes( { width: undefined } ) }
    >
      <ToolsPanelItem
        label={ __( 'Width' ) }
        isShownByDefault
        hasValue={ () => !!selectedWidth }
        onDeselect={ () => setAttributes( { width: undefined } ) }
        __nextHasNoMarginBottom
      >
        <ToggleGroupControl
          label={ __( 'Width' ) }
          value={ selectedWidth }
          onChange={ ( newWidth ) => setAttributes( { width: newWidth } ) }
          isBlock
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        >
          {[25, 50, 75, 100].map((widthValue) => (
            <ToggleGroupControlOption
              key={widthValue}
              value={widthValue}
              label={sprintf(__( '%d%%' ), widthValue)}
            />
          ))}
        </ToggleGroupControl>
      </ToolsPanelItem>
    </ToolsPanel>
  );
}

export default function Edit( { attributes, setAttributes } ) {
  const { text, url, textAlign, width } = attributes;

  const [ isEditingURL, setIsEditingURL ] = useState( false );
  const richTextRef = useRef();
  const blockProps = useBlockProps({
    className: `wp-block-button__link${ width ? ` has-custom-width wp-block-button__width-${width}` : '' }`
  });

  function startEditing( event ) {
    event.preventDefault();
    setIsEditingURL( true );
  }

  function unlink() {
    setAttributes( {
      url: undefined,
      linkTarget: undefined,
      rel: undefined,
    } );
    setIsEditingURL( false );
  }

  return (
    <>
      <RichText
        { ...blockProps }
        ref={richTextRef}
        tagName="a"
        value={text}
        onChange={(value) => setAttributes({ text: value })}
        placeholder={__('Add text…')}
      />

      <BlockControls group="block">
        <AlignmentControl
          value={textAlign}
          onChange={(nextAlign) => setAttributes({ textAlign: nextAlign })}
        />
        {!url && (
          <ToolbarButton
            name="link"
            icon={link}
            title={__('Link')}
            onClick={startEditing}
          />
        )}
        {url && (
          <ToolbarButton
            name="unlink"
            icon={linkOff}
            title={__('Unlink')}
            onClick={unlink}
            isActive
          />
        )}
      </BlockControls>

      {isEditingURL && (
        <Popover
          placement="bottom"
          onClose={() => setIsEditingURL(false)}
          anchor={richTextRef.current?.rootNode}
          focusOnMount
          shift
        >
          <TextControl
            value={url || ''}
            onChange={(newURL) => setAttributes({ url: newURL })}
            placeholder={__('Paste URL…')}
          />
        </Popover>
      )}

      <InspectorControls>
        <WidthPanel selectedWidth={width} setAttributes={setAttributes} />
      </InspectorControls>
    </>
  );
}
