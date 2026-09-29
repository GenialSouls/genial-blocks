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
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Icon } from '../../shared/icons';
import { getSafeRel } from '../../shared/link';
import {
	getResponsiveStyles,
	setResponsiveValue,
} from '../../shared/responsive';
import { ResponsiveDeviceTabs } from '../../shared/responsive-controls';

const iconOptions = [
	{ label: __( 'None', 'genial-blocks' ), value: '' },
	{ label: __( 'Information', 'genial-blocks' ), value: 'info' },
	{ label: __( 'Check', 'genial-blocks' ), value: 'check' },
	{ label: __( 'Star', 'genial-blocks' ), value: 'star' },
	{ label: __( 'Lightbulb', 'genial-blocks' ), value: 'lightbulb' },
	{ label: __( 'Arrow', 'genial-blocks' ), value: 'arrow-right' },
];

const borderStyles = [ 'none', 'solid', 'dashed', 'dotted' ];
const responsiveDefinitions = {
	iconPosition: {
		name: 'icon-direction',
		transform: ( value ) => ( value === 'beside' ? 'row' : 'column' ),
	},
};

function getStyle( attributes ) {
	return {
		'--genial-blocks-info-box-icon-color':
			attributes.iconColor || undefined,
		'--genial-blocks-info-box-title-color':
			attributes.titleTextColor || undefined,
		'--genial-blocks-info-box-description-color':
			attributes.descriptionTextColor || undefined,
		'--genial-blocks-info-box-cta-color':
			attributes.ctaTextColor || undefined,
		'--genial-blocks-info-box-background-color':
			attributes.backgroundColor || undefined,
		'--genial-blocks-info-box-border-color':
			attributes.borderColor || undefined,
		'--genial-blocks-info-box-border-style':
			attributes.borderStyle || 'solid',
		'--genial-blocks-info-box-border-width': `${
			Number.isFinite( attributes.borderWidth )
				? attributes.borderWidth
				: 1
		}px`,
		'--genial-blocks-info-box-border-radius': `${
			Number.isFinite( attributes.borderRadius )
				? attributes.borderRadius
				: 8
		}px`,
		'--genial-blocks-info-box-padding': `${
			Number.isFinite( attributes.padding ) ? attributes.padding : 24
		}px`,
		'--genial-blocks-info-box-element-spacing': `${
			Number.isFinite( attributes.elementSpacing )
				? attributes.elementSpacing
				: 12
		}px`,
		'--genial-blocks-info-box-icon-size': `${
			Number.isFinite( attributes.iconSize ) ? attributes.iconSize : 32
		}px`,
		...getResponsiveStyles( attributes.responsive, responsiveDefinitions, {
			prefix: 'genial-info-box',
		} ),
	};
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		icon,
		iconPosition,
		iconSize,
		iconColor,
		title,
		headingLevel,
		description,
		ctaText,
		url,
		opensInNewTab,
		titleTextColor,
		descriptionTextColor,
		ctaTextColor,
		backgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		borderRadius,
		padding,
		elementSpacing,
	} = attributes;
	const Heading = [ 'h2', 'h3', 'h4', 'h5', 'h6' ].includes( headingLevel )
		? headingLevel
		: 'h3';
	const blockProps = useBlockProps( {
		className: `has-icon-position-${ iconPosition || 'above' }`,
		style: getStyle( attributes ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Icon', 'genial-blocks' ) }
						value={ icon }
						options={ iconOptions }
						onChange={ ( value ) =>
							setAttributes( { icon: value } )
						}
					/>
					<p>
						{ __( 'Responsive icon placement', 'genial-blocks' ) }
					</p>
					<ResponsiveDeviceTabs>
						{ ( breakpoint ) => (
							<SelectControl
								label={ __(
									'Icon placement override',
									'genial-blocks'
								) }
								value={
									attributes.responsive?.[ breakpoint ]
										?.iconPosition || ''
								}
								options={ [
									{
										label: __( 'Inherit', 'genial-blocks' ),
										value: '',
									},
									{
										label: __(
											'Above content',
											'genial-blocks'
										),
										value: 'above',
									},
									{
										label: __(
											'Beside content',
											'genial-blocks'
										),
										value: 'beside',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										responsive: setResponsiveValue(
											attributes.responsive,
											breakpoint,
											'iconPosition',
											value
										),
									} )
								}
							/>
						) }
					</ResponsiveDeviceTabs>
					<SelectControl
						label={ __( 'Icon position', 'genial-blocks' ) }
						value={ iconPosition }
						options={ [
							{
								label: __( 'Above content', 'genial-blocks' ),
								value: 'above',
							},
							{
								label: __( 'Beside content', 'genial-blocks' ),
								value: 'beside',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { iconPosition: value } )
						}
					/>
					<SelectControl
						label={ __( 'Title level', 'genial-blocks' ) }
						value={ Heading }
						options={ [ 'h2', 'h3', 'h4', 'h5', 'h6' ].map(
							( value ) => ( {
								label: value.toUpperCase(),
								value,
							} )
						) }
						onChange={ ( value ) =>
							setAttributes( { headingLevel: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Icon', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Size (px)', 'genial-blocks' ) }
						value={ iconSize }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
						min={ 12 }
						max={ 96 }
					/>
					<p>{ __( 'Icon color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ iconColor }
						onChange={ ( value ) =>
							setAttributes( { iconColor: value || '' } )
						}
						clearable
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content & link', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'URL', 'genial-blocks' ) }
						type="url"
						value={ url }
						onChange={ ( value ) =>
							setAttributes( { url: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'genial-blocks' ) }
						checked={ opensInNewTab }
						onChange={ ( value ) =>
							setAttributes( { opensInNewTab: value } )
						}
						help={
							opensInNewTab
								? __(
										'This link uses noopener and noreferrer.',
										'genial-blocks'
								  )
								: undefined
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Title color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ titleTextColor }
						onChange={ ( value ) =>
							setAttributes( { titleTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Description color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ descriptionTextColor }
						onChange={ ( value ) =>
							setAttributes( {
								descriptionTextColor: value || '',
							} )
						}
						clearable
					/>
					<p>{ __( 'CTA color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ ctaTextColor }
						onChange={ ( value ) =>
							setAttributes( { ctaTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Background color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value || '' } )
						}
						clearable
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Border color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ borderColor }
						onChange={ ( value ) =>
							setAttributes( { borderColor: value || '' } )
						}
						clearable
					/>
					<SelectControl
						label={ __( 'Border style', 'genial-blocks' ) }
						value={ borderStyle }
						options={ borderStyles.map( ( value ) => ( {
							label:
								value.charAt( 0 ).toUpperCase() +
								value.slice( 1 ),
							value,
						} ) ) }
						onChange={ ( value ) =>
							setAttributes( { borderStyle: value } )
						}
					/>
					<RangeControl
						label={ __( 'Border width (px)', 'genial-blocks' ) }
						value={ borderWidth }
						onChange={ ( value ) =>
							setAttributes( { borderWidth: value } )
						}
						min={ 0 }
						max={ 12 }
					/>
					<RangeControl
						label={ __( 'Border radius (px)', 'genial-blocks' ) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 64 }
					/>
					<RangeControl
						label={ __( 'Internal padding (px)', 'genial-blocks' ) }
						value={ padding }
						onChange={ ( value ) =>
							setAttributes( { padding: value } )
						}
						min={ 0 }
						max={ 96 }
					/>
					<RangeControl
						label={ __( 'Element spacing (px)', 'genial-blocks' ) }
						value={ elementSpacing }
						onChange={ ( value ) =>
							setAttributes( { elementSpacing: value } )
						}
						min={ 0 }
						max={ 64 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ icon && (
					<span className="genial-blocks-info-box__icon">
						<Icon name={ icon } size={ iconSize } />
					</span>
				) }
				<div className="genial-blocks-info-box__content">
					<RichText
						tagName={ Heading }
						className="genial-blocks-info-box__title"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
						placeholder={ __( 'Write a title…', 'genial-blocks' ) }
						aria-label={ __( 'Info box title', 'genial-blocks' ) }
					/>
					<RichText
						tagName="p"
						className="genial-blocks-info-box__description"
						value={ description }
						onChange={ ( value ) =>
							setAttributes( { description: value } )
						}
						placeholder={ __(
							'Write a description…',
							'genial-blocks'
						) }
						aria-label={ __(
							'Info box description',
							'genial-blocks'
						) }
					/>
					{ ctaText && (
						<RichText
							tagName="a"
							className="genial-blocks-info-box__cta"
							value={ ctaText }
							onChange={ ( value ) =>
								setAttributes( { ctaText: value } )
							}
							href={ url || '#' }
							target={ opensInNewTab ? '_blank' : undefined }
							rel={ getSafeRel( opensInNewTab ) }
							onClick={ ( event ) => event.preventDefault() }
							aria-label={ __(
								'Info box call to action',
								'genial-blocks'
							) }
						/>
					) }
				</div>
			</div>
		</>
	);
}
