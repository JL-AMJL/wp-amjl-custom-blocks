// CLEAN VERSION: Only sidebar, no mobile filter panel

import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PanelBody, Button, Modal, TextControl, Icon, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { search, chevronDown, chevronUp } from '@wordpress/icons';
import iconsData from './libraries/filtered-icons.min.json';

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [tempSelectedIcon, setTempSelectedIcon] = useState(attributes.selectedIcon);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [styleFilter, setStyleFilter] = useState(() => {
        const iconKey = attributes.selectedIcon ?? '';
        const lastDash = iconKey.lastIndexOf('-');
        const iconBase = iconKey.slice(0, lastDash);
        const iconMeta = iconsData.icons[iconBase];
        if (iconMeta?.s.includes('brands')) return 'brands';
        if (iconMeta?.s.includes('regular')) return 'regular';
        return 'solid';
    });

    const [previewIconSize, setPreviewIconSize] = useState(48);
    const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(false);

    const icons = iconsData.icons;

    const filteredIcons = Object.keys(icons).filter((icon) => {
        const meta = icons[icon];
        const keywords = meta.k;
        const label = meta.l.toLowerCase();
        const matchesStyle = meta.s.includes(styleFilter);
        const matchesCategory = !categoryFilter || meta.c?.includes(categoryFilter);
        return matchesStyle && matchesCategory && (
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
                            onClick={() => {
                                setTempSelectedIcon(attributes.selectedIcon);
                                setPreviewIconSize(32);
                                setIsModalOpen(true);
                            }}
                            style={{ width: '100%' }}
                        >
                            {attributes.selectedIcon ? 'Change Icon' : 'Select Icon'}
                        </Button>
                    </div>
                    <UnitControl
                        label="Icon Size"
                        value={attributes.iconSize}
                        onChange={(value) => setAttributes({ iconSize: value })}
                        min={0}
                        units={[
                            { value: 'px', label: 'px', default: 32 },
                            { value: 'em', label: 'em', default: 2.0 },
                            { value: 'rem', label: 'rem', default: 2.0 },
                            { value: '%', label: '%', default: 100 },
                            { value: 'vw', label: 'vw', default: 5 }                
                        ]}
                        isResetValueOnUnitChange
                        isUnitSelectTabbable
                        __nextHasNoMarginBottom
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {attributes.selectedIcon && (
                    <i className={`amjl-${currentStyleClass} amjl-${baseIcon}`} style={{ fontSize: attributes.iconSize }}></i>
                )}
            </div>

            {isModalOpen && (
                <Modal
                    title="Select an Icon"
                    onRequestClose={() => setIsModalOpen(false)}
                    className="amjl-icon-modal components-modal__content"
                    style={{ width: '90vw', height: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
                >
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', height: '100%' }}>
                        <div className="amjl-sidebar" style={{ flex: '0 0 240px', borderRight: '1px solid #eee', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <RangeControl
                                label="Preview Size"
                                value={previewIconSize}
                                onChange={(value) => setPreviewIconSize(value)}
                                min={32}
                                max={96}
                                step={8}
                                hideInputField
                            />
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                background: '#fff', border: '1px solid #ccc',
                                borderRadius: '2px', padding: '0 8px', height: '30px'
                            }}>
                                <Icon icon={search} style={{ marginRight: '6px' }} />
                                <input
                                    type="search"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    placeholder="Search icons…"
                                    style={{
                                        border: 'none', outline: 'none', boxShadow: 'none',
                                        flex: 1, fontSize: '13px', background: 'transparent'
                                    }}
                                />
                            </div>
                            <div
                                role="button"
                                onClick={() => setIsCategoryPanelOpen(!isCategoryPanelOpen)}
                                aria-expanded={isCategoryPanelOpen}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    fontSize: '13px', fontWeight: 500,
                                    color: '#1e1e1e', cursor: 'pointer'
                                }}
                            >
                                <Icon icon={isCategoryPanelOpen ? chevronUp : chevronDown} />
                                <span>Categories</span>
                            </div>
                            {isCategoryPanelOpen && (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {[...new Set(Object.values(icons).flatMap(icon => icon.c || []))].map((cat) => (
                                        <Button
                                            key={cat}
                                            variant={cat === categoryFilter ? 'primary' : 'secondary'}
                                            onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
                                        >
                                            {cat}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '20px 12px 0 12px', display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${previewIconSize + 24}px, 1fr))`, gridAutoRows: 'auto', gap: '10px', justifyContent: 'start', alignContent: 'start' }}>
                            {filteredIcons.map((icon) => {
                                const iconClassName = `${icon}-${styleFilter}`;
                                const styleClass = styleClassMap[styleFilter];
                                const isSelected = tempSelectedIcon === iconClassName;
                                return (
                                    <Button
                                        key={iconClassName}
                                        onClick={() => setTempSelectedIcon(iconClassName)}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '4px',
                                            padding: '4px',
                                            border: isSelected ? '1px solid #007cba' : '1px solid transparent',
                                            borderRadius: '4px',
                                            backgroundColor: isSelected ? 'rgba(0, 123, 186, 0.08)' : 'transparent',
                                            transition: 'border 0.15s ease, background-color 0.15s ease'
                                        }}
                                    >
                                        <i className={`amjl-${styleClass} amjl-${icon}`} style={{ marginTop: '2px', fontSize: `${previewIconSize}px` }}></i>
                                        <span style={{ fontSize: '10px', textAlign: 'center', marginTop: '6px', lineHeight: '1.1' }}>{icon}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ position: 'sticky', bottom: 0, zIndex: 20, background: '#fff', boxShadow: 'none', padding: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setAttributes({ selectedIcon: tempSelectedIcon });
                                setIsModalOpen(false);
                            }}
                            disabled={!tempSelectedIcon}
                        >
                            Confirm Selection
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
}
