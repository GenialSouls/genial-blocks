import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	ColorPalette,
	PanelBody,
	RangeControl,
	TextControl,
} from '@wordpress/components';

const clamp = ( value, min, max ) =>
	Math.min( Math.max( Number.isFinite( value ) ? value : min, min ), max );
const css = ( a ) => ( {
	'--genial-progress-bar': a.barColor || undefined,
	'--genial-progress-track': a.trackColor || undefined,
	'--genial-progress-label': a.labelColor || undefined,
	'--genial-progress-height': `${ a.height || 12 }px`,
	'--genial-progress-radius': `${ a.radius || 999 }px`,
	'--genial-progress-spacing': `${ a.spacing || 8 }px`,
} );
export default function Edit( { attributes, setAttributes } ) {
	const min = Number.isFinite( attributes.minimum ) ? attributes.minimum : 0;
	const max = Math.max(
		min + 1,
		Number.isFinite( attributes.maximum ) ? attributes.maximum : 100
	);
	const value = clamp( attributes.value, min, max );
	const percent = ( ( value - min ) / ( max - min ) ) * 100;
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Colors', 'genial-blocks' ) }>
					<p>{ __( 'Bar', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.barColor }
						onChange={ ( v ) =>
							setAttributes( { barColor: v || '' } )
						}
						clearable
					/>
					<p>{ __( 'Track', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.trackColor }
						onChange={ ( v ) =>
							setAttributes( { trackColor: v || '' } )
						}
						clearable
					/>
					<p>{ __( 'Label', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.labelColor }
						onChange={ ( v ) =>
							setAttributes( { labelColor: v || '' } )
						}
						clearable
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Values & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __(
							'Displayed value override',
							'genial-blocks'
						) }
						value={ attributes.displayValue }
						onChange={ ( newValue ) =>
							setAttributes( { displayValue: newValue } )
						}
					/>
					<TextControl
						label={ __( 'Value suffix', 'genial-blocks' ) }
						value={ attributes.suffix }
						onChange={ ( newValue ) =>
							setAttributes( { suffix: newValue } )
						}
					/>
					<RangeControl
						label={ __( 'Minimum', 'genial-blocks' ) }
						value={ attributes.minimum }
						onChange={ ( v ) => setAttributes( { minimum: v } ) }
						min={ -1000 }
						max={ 1000 }
					/>
					<RangeControl
						label={ __( 'Maximum', 'genial-blocks' ) }
						value={ attributes.maximum }
						onChange={ ( v ) => setAttributes( { maximum: v } ) }
						min={ -1000 }
						max={ 1000 }
					/>
					<RangeControl
						label={ __( 'Value', 'genial-blocks' ) }
						value={ attributes.value }
						onChange={ ( v ) => setAttributes( { value: v } ) }
						min={ min }
						max={ max }
					/>
					<RangeControl
						label={ __( 'Height (px)', 'genial-blocks' ) }
						value={ attributes.height }
						onChange={ ( v ) => setAttributes( { height: v } ) }
						min={ 2 }
						max={ 64 }
					/>
					<RangeControl
						label={ __(
							'Animation duration (ms)',
							'genial-blocks'
						) }
						value={ attributes.duration }
						onChange={ ( v ) => setAttributes( { duration: v } ) }
						min={ 0 }
						max={ 5000 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { style: css( attributes ) } ) }>
				<div className="genial-blocks-progress__header">
					<RichText
						tagName="span"
						value={ attributes.label }
						onChange={ ( v ) => setAttributes( { label: v } ) }
					/>
					<span>
						{ attributes.displayValue ||
							`${ value }${ attributes.suffix }` }
					</span>
				</div>
				<div
					className="genial-blocks-progress__track"
					role="progressbar"
					aria-valuemin={ min }
					aria-valuemax={ max }
					aria-valuenow={ value }
				>
					<span
						className="genial-blocks-progress__bar"
						style={ { width: `${ percent }%` } }
					/>
				</div>
			</div>
		</>
	);
}
