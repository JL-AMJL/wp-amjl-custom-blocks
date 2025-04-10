// SwiperInspectorControls.js
import { __ } from '@wordpress/i18n';
import {
	InspectorControls
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
import {
	justifyStretch,
	alignLeft,
	alignRight,
	alignCenter
} from '@wordpress/icons';

/**
 * Settings Panel für den Swiper-Block.
 *
 * Dieser Component rendert die Gutenberg Inspector Panels zur Steuerung der Swiper-Funktionen:
 * Autoplay, Loop, Slideanzahl, Höhe, Ausrichtung, Navigation und Pagination.
 *
 * Die Einstellungen werden direkt per `setAttributes` an den Block zurückgegeben.
 *
 * @param {Object} props
 * @param {Object} props.attributes - Die aktuellen Blockattribute.
 * @param {Function} props.setAttributes - Funktion zum Aktualisieren der Blockattribute.
 *
 * @returns {JSX.Element} InspectorControls JSX für Gutenberg Sidebar
 */
export default function SwiperSettingsPanel({ attributes, setAttributes }) {
	const {
		autoplay,
		autoplaySpeed,
		isLoop,
		slidesPerView,
		align,
		height,
		showNavigation,
		navigationPosition,
		navigationOffsetX,
		navigationOffsetY,
		navigationSize,
		showPagination,
		paginationOffsetY,
		paginationBulletSize,
		paginationBulletHorizontalGap,
		paginationBulletVerticalGap
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={__('Slider Einstellungen', 'wp-amjl-custom-blocks')} initialOpen={false}>
				<ToggleControl
					label={__('Autoplay', 'wp-amjl-custom-blocks')}
					checked={autoplay}
					onChange={(value) => setAttributes({ autoplay: value })}
				/>
				{autoplay && (
					<RangeControl
						label={__('Autoplay Speed (ms)', 'wp-amjl-custom-blocks')}
						value={autoplaySpeed}
						onChange={(value) => setAttributes({ autoplaySpeed: value })}
						min={0}
						max={10000}
						step={1}
					/>
				)}
				<ToggleControl
					label={__('Loop', 'wp-amjl-custom-blocks')}
					checked={isLoop}
					onChange={(value) => setAttributes({ isLoop: value })}
				/>
				<RangeControl
					label={__('Slideanzahl', 'wp-amjl-custom-blocks')}
					value={slidesPerView}
					onChange={(value) => setAttributes({ slidesPerView: value })}
					min={1}
					max={10}
				/>
				<UnitControl
					label={__('Höhe', 'wp-amjl-custom-blocks')}
					value={height}
					onChange={(value) => setAttributes({ height: value })}
					units={[
						{ value: 'px', label: 'px', default: 100 },
						{ value: '%', label: '%', default: 100 },
						{ value: 'vh', label: 'vh' },
						{ value: 'vw', label: 'vw' },
						{ value: 'em', label: 'em' },
						{ value: 'rem', label: 'rem' }
					]}
					isUnitSelectTabbable
					__nextHasNoMarginBottom
					isResetValueOnUnitChange
				/>
				<SelectControl
					label={__('Ausrichtung', 'wp-amjl-custom-blocks')}
					value={align}
					onChange={(value) => setAttributes({ align: value })}
					options={[
						{ label: __('Standard', 'wp-amjl-custom-blocks'), value: '' },
						{ label: __('Breit (Wide)', 'wp-amjl-custom-blocks'), value: 'alignwide' },
						{ label: __('Vollbreite (Full)', 'wp-amjl-custom-blocks'), value: 'alignfull' }
					]}
				/>
			</PanelBody>

			<PanelBody title='Navigation Einstellungen' initialOpen={false}>
				<h3>{__('Navigation Einstellungen', 'wp-amjl-custom-blocks')}</h3>
				<ToggleControl
					label={__('Navigation Arrows', 'wp-amjl-custom-blocks')}
					checked={showNavigation}
					onChange={(value) => setAttributes({ showNavigation: value })}
				/>
				{showNavigation && (
					<>
						<ToggleGroupControl
							label={__('Position Presets', 'wp-amjl-custom-blocks')}
							value={navigationPosition}
							onChange={(value) => setAttributes({ navigationPosition: value })}
							isBlock
						>
							<ToggleGroupControlOption value="standard" label="Standard" icon={justifyStretch} />
							<ToggleGroupControlOption value="bottom-center" label="Unten Mitte" icon={alignCenter} />
							<ToggleGroupControlOption value="bottom-left" label="Unten Links" icon={alignLeft} />
							<ToggleGroupControlOption value="bottom-right" label="Unten Rechts" icon={alignRight} />
						</ToggleGroupControl>
						<RangeControl
							label={__('X-Verschiebung (px)', 'wp-amjl-custom-blocks')}
							value={navigationOffsetX}
							onChange={(value) => setAttributes({ navigationOffsetX: value })}
							min={-200}
							max={200}
						/>
						<RangeControl
							label={__('Y-Verschiebung (px)', 'wp-amjl-custom-blocks')}
							value={navigationOffsetY}
							onChange={(value) => setAttributes({ navigationOffsetY: value })}
							min={-200}
							max={200}
						/>
						<UnitControl
							label={__('Navigation Größe', 'wp-amjl-custom-blocks')}
							value={navigationSize}
							onChange={(value) => setAttributes({ navigationSize: value })}
							units={[
								{ value: 'px', label: 'px', default: 44 },
								{ value: '%', label: '%' },
								{ value: 'vh', label: 'vh' },
								{ value: 'vw', label: 'vw' },
								{ value: 'em', label: 'em' },
								{ value: 'rem', label: 'rem' }
							]}
							isUnitSelectTabbable
							__nextHasNoMarginBottom
						/>
					</>
				)}
			</PanelBody>

			<PanelBody title={__('Pagination Einstellungen', 'wp-amjl-custom-blocks')} initialOpen={false}>
				<ToggleControl
					label={__('Pagination', 'wp-amjl-custom-blocks')}
					checked={showPagination}
					onChange={(value) => setAttributes({ showPagination: value })}
				/>
				{showPagination && (
					<>
						<RangeControl
							label={__('Y-Verschiebung (px)', 'wp-amjl-custom-blocks')}
							value={paginationOffsetY}
							onChange={(value) => setAttributes({ paginationOffsetY: value })}
							min={-200}
							max={200}
							allowReset
							resetFallbackValue={8}
						/>
						<UnitControl
							label={__('Bullet Größe', 'wp-amjl-custom-blocks')}
							value={paginationBulletSize}
							onChange={(value) => setAttributes({ paginationBulletSize: value })}
							units={[{ value: 'px', label: 'px', default: 8 }]}
							isUnitSelectTabbable
							isResetValueOnUnitChange
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={__('Bulletabstand X', 'wp-amjl-custom-blocks')}
							value={paginationBulletHorizontalGap}
							onChange={(value) => setAttributes({ paginationBulletHorizontalGap: value })}
							min={0}
							max={200}
							allowReset
							resetFallbackValue={4}
						/>
						<RangeControl
							label={__('Bulletabstand Y', 'wp-amjl-custom-blocks')}
							value={paginationBulletVerticalGap}
							onChange={(value) => setAttributes({ paginationBulletVerticalGap: value })}
							min={0}
							max={200}
							allowReset
							resetFallbackValue={6}
						/>
					</>
				)}
			</PanelBody>
		</InspectorControls>
	);
}
