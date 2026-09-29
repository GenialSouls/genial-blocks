import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

function getSafeNumber( value, fallback = 0 ) {
	const number = Number.parseFloat( value );
	return Number.isFinite( number ) ? number : fallback;
}

function getStyle( attributes ) {
	return {
		'--genial-blocks-counter-number-color':
			attributes.numberColor || undefined,
		'--genial-blocks-counter-label-color':
			attributes.labelColor || undefined,
		'--genial-blocks-counter-spacing': `${
			Number.isFinite( attributes.spacing ) ? attributes.spacing : 8
		}px`,
	};
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		startValue,
		endValue,
		prefix,
		suffix,
		label,
		decimals,
		duration,
		alignment,
	} = attributes;
	const preview = getSafeNumber( endValue ).toFixed(
		Math.min( Math.max( decimals, 0 ), 4 )
	);
	const blockProps = useBlockProps( {
		className: `has-counter-align-${ alignment || 'center' }`,
		style: getStyle( attributes ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Starting value', 'genial-blocks' ) }
						type="number"
						value={ startValue }
						onChange={ ( value ) =>
							setAttributes( { startValue: value } )
						}
					/>
					<TextControl
						label={ __( 'Ending value', 'genial-blocks' ) }
						type="number"
						value={ endValue }
						onChange={ ( value ) =>
							setAttributes( { endValue: value } )
						}
					/>
					<TextControl
						label={ __( 'Prefix', 'genial-blocks' ) }
						value={ prefix }
						onChange={ ( value ) =>
							setAttributes( { prefix: value } )
						}
					/>
					<TextControl
						label={ __( 'Suffix', 'genial-blocks' ) }
						value={ suffix }
						onChange={ ( value ) =>
							setAttributes( { suffix: value } )
						}
					/>
					<TextControl
						label={ __( 'Label', 'genial-blocks' ) }
						value={ label }
						onChange={ ( value ) =>
							setAttributes( { label: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Layout & colors', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Alignment', 'genial-blocks' ) }
						value={ alignment }
						options={ [ 'left', 'center', 'right' ].map(
							( value ) => ( {
								label:
									value.charAt( 0 ).toUpperCase() +
									value.slice( 1 ),
								value,
							} )
						) }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
					<RangeControl
						label={ __( 'Decimal places', 'genial-blocks' ) }
						value={ decimals }
						onChange={ ( value ) =>
							setAttributes( { decimals: value } )
						}
						min={ 0 }
						max={ 4 }
					/>
					<RangeControl
						label={ __(
							'Animation duration (ms)',
							'genial-blocks'
						) }
						value={ duration }
						onChange={ ( value ) =>
							setAttributes( { duration: value } )
						}
						min={ 0 }
						max={ 5000 }
						step={ 100 }
					/>
					<RangeControl
						label={ __( 'Label spacing (px)', 'genial-blocks' ) }
						value={ attributes.spacing }
						onChange={ ( value ) =>
							setAttributes( { spacing: value } )
						}
						min={ 0 }
						max={ 48 }
					/>
					<p>{ __( 'Number color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.numberColor }
						onChange={ ( value ) =>
							setAttributes( { numberColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Label color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.labelColor }
						onChange={ ( value ) =>
							setAttributes( { labelColor: value || '' } )
						}
						clearable
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<span className="genial-blocks-counter__number">
					{ prefix }
					{ preview }
					{ suffix }
				</span>
				{ label && (
					<span className="genial-blocks-counter__label">
						{ label }
					</span>
				) }
			</div>
		</>
	);
}
