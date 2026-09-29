import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	URLInput,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import {
	getResponsiveStyles,
	setResponsiveValue,
} from '../../shared/responsive';
import { ResponsiveDeviceTabs } from '../../shared/responsive-controls';

const responsiveDefinitions = { alignment: 'align' };

const css = ( a ) => ( {
	'--genial-pricing-text': a.textColor || undefined,
	'--genial-pricing-price': a.priceColor || undefined,
	'--genial-pricing-accent': a.accentColor || undefined,
	'--genial-pricing-bg': a.backgroundColor || undefined,
	'--genial-pricing-border': a.borderColor || undefined,
	'--genial-pricing-radius': `${ a.borderRadius || 8 }px`,
	'--genial-pricing-padding': `${ a.padding || 24 }px`,
	'--genial-pricing-align': a.alignment || 'center',
	...getResponsiveStyles( a.responsive, responsiveDefinitions, {
		prefix: 'genial-pricing',
	} ),
} );
const newId = ( features ) => `feature-${ features.length + 1 }`;
export default function Edit( { attributes, setAttributes } ) {
	const features = Array.isArray( attributes.features )
		? attributes.features
		: [];
	const update = ( key, value ) => setAttributes( { [ key ]: value } );
	const add = () =>
		setAttributes( {
			features: [ ...features, { id: newId( features ), text: '' } ],
		} );
	const remove = ( index ) =>
		setAttributes( {
			features: features.filter( ( _, i ) => i !== index ),
		} );
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'genial-blocks' ) }>
					<TextControl
						label={ __( 'Plan name', 'genial-blocks' ) }
						value={ attributes.planName }
						onChange={ ( value ) => update( 'planName', value ) }
					/>
					<TextControl
						label={ __( 'Subtitle', 'genial-blocks' ) }
						value={ attributes.subtitle }
						onChange={ ( value ) => update( 'subtitle', value ) }
					/>
					<TextControl
						label={ __( 'Currency', 'genial-blocks' ) }
						value={ attributes.currency }
						onChange={ ( value ) => update( 'currency', value ) }
					/>
					<TextControl
						label={ __( 'Billing period', 'genial-blocks' ) }
						value={ attributes.billingPeriod }
						onChange={ ( value ) =>
							update( 'billingPeriod', value )
						}
					/>
					<TextControl
						label={ __( 'Badge', 'genial-blocks' ) }
						value={ attributes.badge }
						onChange={ ( value ) => update( 'badge', value ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'CTA', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Button text', 'genial-blocks' ) }
						value={ attributes.ctaText }
						onChange={ ( value ) => update( 'ctaText', value ) }
					/>
					<URLInput
						label={ __( 'Button URL', 'genial-blocks' ) }
						value={ attributes.ctaUrl }
						onChange={ ( value ) => update( 'ctaUrl', value ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'genial-blocks' ) }
						checked={ attributes.opensInNewTab }
						onChange={ ( value ) =>
							update( 'opensInNewTab', value )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors & layout', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Alignment', 'genial-blocks' ) }
						value={ attributes.alignment }
						options={ [ 'left', 'center', 'right' ].map(
							( value ) => ( {
								label: value,
								value,
							} )
						) }
						onChange={ ( value ) => update( 'alignment', value ) }
					/>
					<p>{ __( 'Responsive alignment', 'genial-blocks' ) }</p>
					<ResponsiveDeviceTabs>
						{ ( breakpoint ) => (
							<SelectControl
								label={ __(
									'Alignment override',
									'genial-blocks'
								) }
								value={
									attributes.responsive?.[ breakpoint ]
										?.alignment || ''
								}
								options={ [
									{
										label: __( 'Inherit', 'genial-blocks' ),
										value: '',
									},
									...[ 'left', 'center', 'right' ].map(
										( value ) => ( {
											label: value,
											value,
										} )
									),
								] }
								onChange={ ( value ) =>
									setAttributes( {
										responsive: setResponsiveValue(
											attributes.responsive,
											breakpoint,
											'alignment',
											value
										),
									} )
								}
							/>
						) }
					</ResponsiveDeviceTabs>
					<p>{ __( 'Accent', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.accentColor }
						onChange={ ( value ) =>
							update( 'accentColor', value || '' )
						}
						clearable
					/>
					<p>{ __( 'Background', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.backgroundColor }
						onChange={ ( value ) =>
							update( 'backgroundColor', value || '' )
						}
						clearable
					/>
					<p>{ __( 'Border', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.borderColor }
						onChange={ ( value ) =>
							update( 'borderColor', value || '' )
						}
						clearable
					/>
					<RangeControl
						label={ __( 'Radius (px)', 'genial-blocks' ) }
						value={ attributes.borderRadius }
						onChange={ ( value ) =>
							update( 'borderRadius', value )
						}
						min={ 0 }
						max={ 48 }
					/>
					<RangeControl
						label={ __( 'Padding (px)', 'genial-blocks' ) }
						value={ attributes.padding }
						onChange={ ( value ) => update( 'padding', value ) }
						min={ 8 }
						max={ 64 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { style: css( attributes ) } ) }>
				<div className="genial-blocks-pricing__badge">
					<RichText
						tagName="span"
						value={ attributes.badge }
						onChange={ ( value ) => update( 'badge', value ) }
						placeholder={ __( 'Popular', 'genial-blocks' ) }
					/>
				</div>
				<RichText
					tagName="h3"
					value={ attributes.planName }
					onChange={ ( value ) => update( 'planName', value ) }
				/>
				<RichText
					tagName="p"
					className="genial-blocks-pricing__subtitle"
					value={ attributes.subtitle }
					onChange={ ( value ) => update( 'subtitle', value ) }
				/>
				<div className="genial-blocks-pricing__price">
					<RichText
						tagName="span"
						value={ attributes.currency }
						onChange={ ( value ) => update( 'currency', value ) }
					/>
					<RichText
						tagName="strong"
						value={ attributes.price }
						onChange={ ( value ) => update( 'price', value ) }
					/>
					<RichText
						tagName="del"
						value={ attributes.previousPrice }
						onChange={ ( value ) =>
							update( 'previousPrice', value )
						}
					/>
					<RichText
						tagName="small"
						value={ attributes.billingPeriod }
						onChange={ ( value ) =>
							update( 'billingPeriod', value )
						}
					/>
				</div>
				<ul>
					{ features.map( ( feature, index ) => (
						<li key={ feature.id }>
							<RichText
								tagName="span"
								value={ feature.text }
								onChange={ ( value ) =>
									setAttributes( {
										features: features.map( ( item, i ) =>
											i === index
												? { ...item, text: value }
												: item
										),
									} )
								}
								placeholder={ __( 'Feature', 'genial-blocks' ) }
							/>
							<Button
								icon="no-alt"
								label={ __(
									'Remove feature',
									'genial-blocks'
								) }
								onClick={ () => remove( index ) }
							/>
						</li>
					) ) }
				</ul>
				<Button variant="secondary" onClick={ add }>
					{ __( 'Add feature', 'genial-blocks' ) }
				</Button>
				<RichText
					tagName="a"
					className="genial-blocks-pricing__cta"
					value={ attributes.ctaText }
					onChange={ ( value ) => update( 'ctaText', value ) }
				/>
			</div>
		</>
	);
}
