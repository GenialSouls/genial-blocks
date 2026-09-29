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
import { getSafeRel } from '../../shared/link';
import {
	getResponsiveStyles,
	setResponsiveValue,
} from '../../shared/responsive';
import { ResponsiveDeviceTabs } from '../../shared/responsive-controls';

const borderStyles = [ 'none', 'solid', 'dashed', 'dotted' ];
const responsiveDefinitions = {
	width: {
		name: 'width',
		transform: ( value ) => ( value === 'full' ? '100%' : 'auto' ),
	},
};

function getButtonStyle( attributes ) {
	return {
		'--genial-blocks-button-text-color': attributes.textColor || undefined,
		'--genial-blocks-button-background-color':
			attributes.backgroundColor || undefined,
		'--genial-blocks-button-hover-text-color':
			attributes.hoverTextColor || undefined,
		'--genial-blocks-button-hover-background-color':
			attributes.hoverBackgroundColor || undefined,
		'--genial-blocks-button-border-color':
			attributes.borderColor || undefined,
		'--genial-blocks-button-border-style':
			attributes.borderStyle || 'solid',
		'--genial-blocks-button-border-width': `${
			Number.isFinite( attributes.borderWidth )
				? attributes.borderWidth
				: 1
		}px`,
		'--genial-blocks-button-border-radius': `${
			Number.isFinite( attributes.borderRadius )
				? attributes.borderRadius
				: 4
		}px`,
		'--genial-blocks-button-padding-vertical': `${
			Number.isFinite( attributes.paddingVertical )
				? attributes.paddingVertical
				: 12
		}px`,
		'--genial-blocks-button-padding-horizontal': `${
			Number.isFinite( attributes.paddingHorizontal )
				? attributes.paddingHorizontal
				: 20
		}px`,
	};
}

export default function Edit( { attributes, setAttributes } ) {
	const {
		text,
		url,
		opensInNewTab,
		width,
		textColor,
		backgroundColor,
		hoverTextColor,
		hoverBackgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		borderRadius,
		paddingVertical,
		paddingHorizontal,
	} = attributes;
	const rel = getSafeRel( opensInNewTab );
	const blockProps = useBlockProps( {
		className: `has-button-width-${ width || 'auto' }`,
		style: getResponsiveStyles(
			attributes.responsive,
			responsiveDefinitions,
			{
				prefix: 'genial-button',
			}
		),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Content & link', 'genial-blocks' ) }
					initialOpen={ true }
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
					<SelectControl
						label={ __( 'Width', 'genial-blocks' ) }
						value={ width }
						options={ [
							{
								label: __( 'Fit content', 'genial-blocks' ),
								value: 'auto',
							},
							{
								label: __( 'Full width', 'genial-blocks' ),
								value: 'full',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
					/>
					<p>{ __( 'Responsive width', 'genial-blocks' ) }</p>
					<ResponsiveDeviceTabs>
						{ ( breakpoint ) => (
							<SelectControl
								label={ __(
									'Width override',
									'genial-blocks'
								) }
								value={
									attributes.responsive?.[ breakpoint ]
										?.width || ''
								}
								options={ [
									{
										label: __( 'Inherit', 'genial-blocks' ),
										value: '',
									},
									{
										label: __(
											'Fit content',
											'genial-blocks'
										),
										value: 'auto',
									},
									{
										label: __(
											'Full width',
											'genial-blocks'
										),
										value: 'full',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										responsive: setResponsiveValue(
											attributes.responsive,
											breakpoint,
											'width',
											value
										),
									} )
								}
							/>
						) }
					</ResponsiveDeviceTabs>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Text color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ textColor }
						onChange={ ( value ) =>
							setAttributes( { textColor: value || '' } )
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
					<p>{ __( 'Hover text color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ hoverTextColor }
						onChange={ ( value ) =>
							setAttributes( { hoverTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Hover background color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ hoverBackgroundColor }
						onChange={ ( value ) =>
							setAttributes( {
								hoverBackgroundColor: value || '',
							} )
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
						label={ __( 'Vertical padding (px)', 'genial-blocks' ) }
						value={ paddingVertical }
						onChange={ ( value ) =>
							setAttributes( { paddingVertical: value } )
						}
						min={ 0 }
						max={ 64 }
					/>
					<RangeControl
						label={ __(
							'Horizontal padding (px)',
							'genial-blocks'
						) }
						value={ paddingHorizontal }
						onChange={ ( value ) =>
							setAttributes( { paddingHorizontal: value } )
						}
						min={ 0 }
						max={ 96 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="a"
					className="genial-blocks-advanced-button__link"
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					href={ url || '#' }
					target={ opensInNewTab ? '_blank' : undefined }
					rel={ rel }
					onClick={ ( event ) => event.preventDefault() }
					style={ getButtonStyle( attributes ) }
					placeholder={ __( 'Button text', 'genial-blocks' ) }
					aria-label={ __( 'Button text', 'genial-blocks' ) }
				/>
			</div>
		</>
	);
}
