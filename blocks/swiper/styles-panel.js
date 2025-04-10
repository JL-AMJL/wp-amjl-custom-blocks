import { __ } from '@wordpress/i18n';
import { InspectorControls, useSetting } from '@wordpress/block-editor';
import { ColorPalette, PanelBody, TabPanel } from '@wordpress/components';
import { RangeControl } from '@wordpress/components';

/**
 * Style Panel für den Swiper Block
 *
 * Gibt das Gutenberg Styles-Panel für die Farbanpassung der Swiper-Navigation
 * und Pagination zurück. Ermöglicht die Auswahl von Farben für normale und Hover-Zustände
 * der Navigationspfeile sowie für aktive und inaktive Pagination-Bullets.
 *
 * @param {Object} attributes - Die aktuellen Block-Attribute.
 * @param {Function} setAttributes - Funktion zum Aktualisieren der Block-Attribute.
 * @returns {WPElement} Ein JSX-Element, das das Styles-Panel im Editor rendert.
 *
 * @example
 * import { useSwiperStylePanel } from './useSwiperStylePanel';
 *
 * const stylePanel = useSwiperStylePanel(attributes, setAttributes);
 * return (
 *   <>
 *     {stylePanel}
 *     // weitere Block-Komponenten
 *   </>
 * );
 */
export default function SwiperStylesPanel({attributes, setAttributes}) {
	const {
		navigationColor,
		navigationHoverColor,
		paginationActiveColor,
		paginationInactiveColor,
		paginationInactiveOpacity
	} = attributes;

	/**
     * Get the theme's global color palette
     */
    const themeColors = useSetting('color.palette');

	return (
		<InspectorControls group="styles">
			<PanelBody title={__('Navigation Colors', 'wp-amjl-custom-blocks')} initialOpen={false}>
				<TabPanel
					className="color-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: 'standard',
							title: __('Standard', 'wp-amjl-custom-blocks'),
							className: 'tab-standard',
						},
						{
							name: 'hover',
							title: __('Hover', 'wp-amjl-custom-blocks'),
							className: 'tab-hover',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'standard') {
							return (									
								<ColorPalette
									colors={themeColors}
									value={navigationColor}
									onChange={(color) => setAttributes({ navigationColor: color })}
								/>									
							);
						}
						if (tab.name === 'hover') {
							return (									
								<ColorPalette
									colors={themeColors}
									value={navigationHoverColor}
									onChange={(color) => setAttributes({ navigationHoverColor: color })}
								/>									
							);
						}
					}}
				</TabPanel>
			</PanelBody>
			<PanelBody title={__('Pagination Colors', 'wp-amjl-custom-blocks')} initialOpen={false}>
				<TabPanel
					className="color-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: 'active',
							title: __('Active', 'wp-amjl-custom-blocks'),
							className: 'tab-active',
						},
						{
							name: 'inactive',
							title: __('Inactive', 'wp-amjl-custom-blocks'),
							className: 'tab-active',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'active') {
							return (									
								<ColorPalette
									colors={themeColors}
									value={paginationActiveColor}
									onChange={(color) => setAttributes({ paginationActiveColor: color })}
								/>									
							);
						}
						if (tab.name === 'inactive') {
							return (
								<>									
									<ColorPalette
										colors={themeColors}
										value={paginationInactiveColor}
										onChange={(color) => setAttributes({ paginationInactiveColor: color })}
									/>
									<RangeControl
										label={__('Opacity', 'wp-amjl-custom-blocks')}
										value={paginationInactiveOpacity}
										onChange={(value) => setAttributes({ paginationInactiveOpacity: value })}
										min={0}
										max={1}
										step={0.05}
										allowReset
										resetFallbackValue={0.2}
									/>
								</>							
							);
						}
					}}
				</TabPanel>
			</PanelBody>
		</InspectorControls>
	);
}