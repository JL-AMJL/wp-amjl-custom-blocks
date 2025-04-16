import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PanelBody, Button, Modal, TextControl } from '@wordpress/components';
import iconsData from './libraries/filtered-icons.min.json';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [styleFilter, setStyleFilter] = useState(() => {
        const iconKey = attributes.selectedIcon ?? '';
        const lastDash = iconKey.lastIndexOf('-');
        const iconBase = iconKey.slice(0, lastDash);
        const iconMeta = iconsData.icons[iconBase];
        if (iconMeta?.s.includes('brands')) return 'brands';
        if (iconMeta?.s.includes('regular')) return 'regular';
        return 'solid';
    });

    const icons = iconsData.icons;

    const filteredIcons = Object.keys(icons).filter((icon) => {
        const meta = icons[icon];
        const keywords = meta.k;
        const label = meta.l.toLowerCase();
        const matchesStyle = meta.s.includes(styleFilter);
        return matchesStyle && (
            label.includes(filter.toLowerCase()) ||
            keywords.some((keyword) => keyword.includes(filter.toLowerCase()))
        );
    });

    const styleClassMap = {
        solid: 's',
        regular: 'r',
        brands: 'b',
    };

    const lastDash = attributes.selectedIcon?.lastIndexOf('-') ?? -1;
    const baseIcon = attributes.selectedIcon?.slice(0, lastDash);
    const currentStyle = attributes.selectedIcon?.slice(lastDash + 1);
    const currentStyleClass = styleClassMap[currentStyle];

    return (
        <>
            <InspectorControls>
                <PanelBody title="Icon" initialOpen={true}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
                        {attributes.selectedIcon ? (
                            <div style={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                backgroundImage: `linear-gradient(45deg, #eee 25%, transparent 25%),
                                                  linear-gradient(-45deg, #eee 25%, transparent 25%),
                                                  linear-gradient(45deg, transparent 75%, #eee 75%),
                                                  linear-gradient(-45deg, transparent 75%, #eee 75%)`,
                                backgroundSize: '20px 20px',
                                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '10px',
                            }}>
                                <i
                                    className={`amjl-${currentStyleClass} amjl-${baseIcon}`}
                                    style={{ fontSize: '128px' }}
                                ></i>
                            </div>
                        ) : (
                            <span style={{ fontStyle: 'italic', color: '#888', marginBottom: '10px' }}>No icon selected</span>
                        )}
                        <Button
                            variant="secondary"
                            onClick={() => setIsModalOpen(true)}
                            style={{ width: '100%' }}
                        >
                            {attributes.selectedIcon ? 'Change Icon' : 'Select Icon'}
                        </Button>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {attributes.selectedIcon && (
                    <i className={`amjl-${currentStyleClass} amjl-${baseIcon}`}></i>
                )}
            </div>

            {isModalOpen && (
                <Modal
                    title="Select an Icon"
                    onRequestClose={() => setIsModalOpen(false)}
                    className="amjl-icon-modal"
                >
                    <div style={{
                        width: '90vw',
                        height: '80vh',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div className="components-tab-panel__tabs">
                            {['solid', 'regular', 'brands'].map((tabName) => (
                                <button
                                    key={tabName}
                                    className={
                                        'components-tab-panel__tabs-item' + (tabName === styleFilter ? ' is-active' : '')
                                    }
                                    onClick={() => setStyleFilter(tabName)}
                                    aria-pressed={tabName === styleFilter}
                                >
                                    {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                                </button>
                            ))}
                        </div>

                        <TextControl
                            label="Filter Icons"
                            value={filter}
                            onChange={(value) => setFilter(value)}
                        />
                        <div style={{
                            flex: '1 1 auto',
                            overflowY: 'auto',
                            marginTop: '10px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, 50px)',
                            gridAutoRows: '70px',
                            gap: '10px',
                            justifyContent: 'start',
                            alignContent: 'start'
                        }}>
                            {filteredIcons.map((icon) => {
                                const iconClassName = `${icon}-${styleFilter}`;
                                const styleClass = styleClassMap[styleFilter];
                                return (
                                    <Button
                                        key={iconClassName}
                                        onClick={() => {
                                            setAttributes({ selectedIcon: iconClassName });
                                            setIsModalOpen(false);
                                        }}
                                        style={{
                                            width: '50px',
                                            height: '70px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: 0
                                        }}
                                    >
                                        <i className={`amjl-${styleClass} amjl-${icon}`}></i>
                                        <span style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1' }}>{icon}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
}
