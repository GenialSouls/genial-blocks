import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	ColorPalette,
	RangeControl,
	FontSizePicker,
} from '@wordpress/components';

const headingLevels = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];
const fontSizes = [
	{ name: __( 'Small', 'genial-blocks' ), slug: 'small', size: '0.875rem' },
	{ name: __( 'Medium', 'genial-blocks' ), slug: 'medium', size: '1rem' },
	{ name: __( 'Large', 'genial-blocks' ), slug: 'large', size: '1.25rem' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		content,
		headingLevel,
		subtitle,
		subtitleEnabled,
		subtitleFontSize,
		subtitleTextColor,
		subtitleMarginTop,
	} = attributes;
	const Heading = headingLevels.includes( headingLevel )
		? headingLevel
		: 'h2';
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Heading', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Semantic level', 'genial-blocks' ) }
						value={ Heading }
						options={ headingLevels.map( ( level ) => ( {
							label: level.toUpperCase(),
							value: level,
						} ) ) }
						onChange={ ( value ) =>
							setAttributes( { headingLevel: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Subtitle', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show subtitle', 'genial-blocks' ) }
						checked={ subtitleEnabled }
						onChange={ ( value ) =>
							setAttributes( { subtitleEnabled: value } )
						}
					/>
					{ subtitleEnabled && (
						<>
							<FontSizePicker
								value={ subtitleFontSize }
								onChange={ ( value ) =>
									setAttributes( {
										subtitleFontSize: value || '',
									} )
								}
								fontSizes={ fontSizes }
								fallbackFontSize={ 16 }
							/>
							<p>{ __( 'Subtitle color', 'genial-blocks' ) }</p>
							<ColorPalette
								value={ subtitleTextColor }
								onChange={ ( value ) =>
									setAttributes( {
										subtitleTextColor: value || '',
									} )
								}
								clearable
							/>
							<RangeControl
								label={ __(
									'Space above subtitle (px)',
									'genial-blocks'
								) }
								value={ subtitleMarginTop }
								onChange={ ( value ) =>
									setAttributes( {
										subtitleMarginTop: value,
									} )
								}
								min={ 0 }
								max={ 64 }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName={ Heading }
					value={ content }
					onChange={ ( value ) =>
						setAttributes( { content: value } )
					}
					placeholder={ __( 'Write a heading…', 'genial-blocks' ) }
					aria-label={ __( 'Heading text', 'genial-blocks' ) }
				/>
				{ subtitleEnabled && (
					<RichText
						tagName="p"
						className={ `genial-blocks-advanced-heading__subtitle has-subtitle-font-size-${
							subtitleFontSize || 'default'
						}` }
						value={ subtitle }
						onChange={ ( value ) =>
							setAttributes( { subtitle: value } )
						}
						placeholder={ __(
							'Write a subtitle…',
							'genial-blocks'
						) }
						aria-label={ __( 'Subtitle text', 'genial-blocks' ) }
						style={ {
							color: subtitleTextColor || undefined,
							marginTop: `${
								Number.isFinite( subtitleMarginTop )
									? subtitleMarginTop
									: 8
							}px`,
						} }
					/>
				) }
			</div>
		</>
	);
}
