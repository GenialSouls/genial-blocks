import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

const defaultLinks = [
	{ id: 'linkedin', label: 'LinkedIn', url: '' },
	{ id: 'website', label: 'Website', url: '' },
];
const style = ( a ) => ( {
	'--genial-team-name': a.nameColor || undefined,
	'--genial-team-designation': a.designationColor || undefined,
	'--genial-team-bio': a.bioColor || undefined,
	'--genial-team-social': a.socialColor || undefined,
	'--genial-team-background': a.backgroundColor || undefined,
	'--genial-team-border': a.borderColor || undefined,
	'--genial-team-radius': `${
		Number.isFinite( a.borderRadius ) ? a.borderRadius : 12
	}px`,
	'--genial-team-padding': `${
		Number.isFinite( a.padding ) ? a.padding : 24
	}px`,
	'--genial-team-image-size': `${
		Number.isFinite( a.imageSize ) ? a.imageSize : 128
	}px`,
} );

export default function Edit( { attributes: a, setAttributes } ) {
	const links =
		Array.isArray( a.socialLinks ) && a.socialLinks.length
			? a.socialLinks
			: defaultLinks;
	const set = ( values ) => setAttributes( values );
	const updateLink = ( index, values ) =>
		set( {
			socialLinks: links.map( ( link, i ) =>
				i === index ? { ...link, ...values } : link
			),
		} );
	const blockProps = useBlockProps( {
		className: `has-team-member-align-${ a.alignment || 'center' }`,
		style: style( a ),
	} );
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Profile image', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								set( {
									imageUrl: media.url,
									imageId: media.id,
									imageAlt: media.alt || '',
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ a.imageId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ a.imageUrl
										? __( 'Replace image', 'genial-blocks' )
										: __(
												'Choose image',
												'genial-blocks'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ a.imageUrl && (
						<Button
							isDestructive
							onClick={ () =>
								set( {
									imageUrl: '',
									imageId: 0,
									imageAlt: '',
								} )
							}
						>
							{ __( 'Remove image', 'genial-blocks' ) }
						</Button>
					) }
					<SelectControl
						label={ __( 'Image shape', 'genial-blocks' ) }
						value={ a.imageShape }
						options={ [ 'circle', 'rounded', 'square' ].map(
							( value ) => ( {
								label: value,
								value,
							} )
						) }
						onChange={ ( value ) => set( { imageShape: value } ) }
					/>
					<RangeControl
						label={ __( 'Image size (px)', 'genial-blocks' ) }
						value={ a.imageSize }
						min={ 48 }
						max={ 240 }
						onChange={ ( value ) => set( { imageSize: value } ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Social links', 'genial-blocks' ) }
					initialOpen={ false }
				>
					{ links.map( ( link, index ) => (
						<div key={ link.id || index }>
							<TextControl
								label={
									link.label ||
									__( 'Social link', 'genial-blocks' )
								}
								type="url"
								value={ link.url }
								onChange={ ( value ) =>
									updateLink( index, { url: value } )
								}
							/>
						</div>
					) ) }
					<Button
						variant="secondary"
						onClick={ () =>
							set( {
								socialLinks: [
									...links,
									{
										id: `link-${ links.length + 1 }`,
										label: __(
											'Social link',
											'genial-blocks'
										),
										url: '',
									},
								],
							} )
						}
					>
						{ __( 'Add social link', 'genial-blocks' ) }
					</Button>
				</PanelBody>
				<PanelBody
					title={ __( 'Presentation', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Alignment', 'genial-blocks' ) }
						value={ a.alignment }
						options={ [ 'left', 'center', 'right' ].map(
							( value ) => ( {
								label: value,
								value,
							} )
						) }
						onChange={ ( value ) => set( { alignment: value } ) }
					/>
					{ [
						[ 'nameColor', 'Name color' ],
						[ 'designationColor', 'Designation color' ],
						[ 'bioColor', 'Biography color' ],
						[ 'socialColor', 'Social link color' ],
						[ 'backgroundColor', 'Background' ],
						[ 'borderColor', 'Border' ],
					].map( ( [ key, label ] ) => (
						<div key={ key }>
							<p>{ label }</p>
							<ColorPalette
								value={ a[ key ] }
								onChange={ ( value ) =>
									set( { [ key ]: value || '' } )
								}
								clearable
							/>
						</div>
					) ) }
					<RangeControl
						label={ __( 'Padding (px)', 'genial-blocks' ) }
						value={ a.padding }
						min={ 0 }
						max={ 96 }
						onChange={ ( value ) => set( { padding: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<article { ...blockProps }>
				{ a.imageUrl && (
					<img
						className={ `genial-blocks-team-member__image is-${
							a.imageShape || 'circle'
						}` }
						src={ a.imageUrl }
						alt={ a.imageAlt }
					/>
				) }
				<RichText
					tagName="h3"
					className="genial-blocks-team-member__name"
					value={ a.name }
					onChange={ ( value ) => set( { name: value } ) }
					placeholder={ __( 'Member name', 'genial-blocks' ) }
				/>
				<RichText
					tagName="p"
					className="genial-blocks-team-member__designation"
					value={ a.designation }
					onChange={ ( value ) => set( { designation: value } ) }
					placeholder={ __( 'Designation', 'genial-blocks' ) }
				/>
				<RichText
					tagName="p"
					className="genial-blocks-team-member__bio"
					value={ a.bio }
					onChange={ ( value ) => set( { bio: value } ) }
					placeholder={ __( 'Short biography', 'genial-blocks' ) }
				/>
				<nav
					className="genial-blocks-team-member__social"
					aria-label={ __( 'Social links', 'genial-blocks' ) }
				>
					{ links
						.filter( ( link ) => link.url )
						.map( ( link ) => (
							<span key={ link.id }>{ link.label }</span>
						) ) }
				</nav>
			</article>
		</>
	);
}
