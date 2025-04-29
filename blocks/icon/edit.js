import { useBlockProps, InspectorControls, useSetting } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { PanelBody, Button, Modal, TextControl, Icon, RangeControl, __experimentalUnitControl as UnitControl, ColorPalette } from '@wordpress/components';
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

    const themeColors = useSetting('color.palette') || [];

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
                                    style={{ fontSize: '128px', color: attributes.iconColor }}
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

                        <span style={{ fontSize: '11px', fontWeight: 500, lineHeight: '1.4', textTransform: 'uppercase' }}>Icon Color</span>
                        <ColorPalette colors={themeColors}
                            label="Icon Color"
                            value={attributes.iconColorSlug ? themeColors.find(c => c.slug === attributes.iconColorSlug)?.color : undefined}
                            onChange={(value) => {
                                const selected = themeColors.find((c) => c.color === value);
                                if (selected) {
                                    setAttributes({ iconColorSlug: selected.slug });
                                } else {
                                    setAttributes({ iconColorSlug: null });
                                }
                            }}
                            disableCustomColors
                            clearable
                        />
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
                    <i className={`amjl-${currentStyleClass} amjl-${baseIcon}`} style={{ fontSize: attributes.iconSize, color: attributes.iconColorSlug ? `var(--wp--preset--color--${attributes.iconColorSlug})` : undefined }}></i>
                )}
            </div>
        </>
    );
}