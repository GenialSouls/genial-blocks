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
	ToggleControl,
} from '@wordpress/components';

function getStyle( a ) {
	return {
		'--genial-testimonial-quote': a.quoteColor || undefined,
		'--genial-testimonial-name': a.nameColor || undefined,
		'--genial-testimonial-meta': a.metaColor || undefined,
		'--genial-testimonial-rating': a.ratingColor || undefined,
		'--genial-testimonial-background': a.backgroundColor || undefined,
		'--genial-testimonial-border': a.borderColor || undefined,
		'--genial-testimonial-radius': `${
			Number.isFinite( a.borderRadius ) ? a.borderRadius : 12
		}px`,
		'--genial-testimonial-padding': `${
			Number.isFinite( a.padding ) ? a.padding : 28
		}px`,
		'--genial-testimonial-avatar-size': `${
			Number.isFinite( a.avatarSize ) ? a.avatarSize : 64
		}px`,
	};
}

export default function Edit( { attributes: a, setAttributes } ) {
	const set = ( values ) => setAttributes( values );
	const blockProps = useBlockProps( {
		className: `has-testimonial-align-${ a.alignment || 'left' }`,
		style: getStyle( a ),
	} );
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Author image', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								set( {
									avatarUrl: media.url,
									avatarId: media.id,
									avatarAlt: media.alt || '',
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ a.avatarId }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="secondary">
									{ a.avatarUrl
										? __( 'Replace image', 'genial-blocks' )
										: __(
												'Choose image',
												'genial-blocks'
										  ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ a.avatarUrl && (
						<Button
							isDestructive
							onClick={ () =>
								set( {
									avatarUrl: '',
									avatarId: 0,
									avatarAlt: '',
								} )
							}
						>
							{ __( 'Remove image', 'genial-blocks' ) }
						</Button>
					) }
					<SelectControl
						label={ __( 'Image shape', 'genial-blocks' ) }
						value={ a.avatarShape }
						options={ [ 'circle', 'rounded', 'square' ].map(
							( value ) => ( {
								label: value,
								value,
							} )
						) }
						onChange={ ( value ) => set( { avatarShape: value } ) }
					/>
					<RangeControl
						label={ __( 'Image size (px)', 'genial-blocks' ) }
						value={ a.avatarSize }
						min={ 32 }
						max={ 160 }
						onChange={ ( value ) => set( { avatarSize: value } ) }
					/>
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
					<ToggleControl
						label={ __( 'Show rating', 'genial-blocks' ) }
						checked={ a.showRating }
						onChange={ ( value ) => set( { showRating: value } ) }
					/>
					{ a.showRating && (
						<RangeControl
							label={ __( 'Rating', 'genial-blocks' ) }
							value={ a.rating }
							min={ 1 }
							max={ 5 }
							step={ 0.5 }
							onChange={ ( value ) => set( { rating: value } ) }
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Colors & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					{ [
						[ 'quoteColor', 'Quote color' ],
						[ 'nameColor', 'Name color' ],
						[ 'metaColor', 'Metadata color' ],
						[ 'ratingColor', 'Rating color' ],
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
					<RangeControl
						label={ __( 'Border radius (px)', 'genial-blocks' ) }
						value={ a.borderRadius }
						min={ 0 }
						max={ 64 }
						onChange={ ( value ) => set( { borderRadius: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<figure { ...blockProps }>
				{ a.avatarUrl && (
					<img
						className="genial-blocks-testimonial__avatar"
						src={ a.avatarUrl }
						alt={ a.avatarAlt }
					/>
				) }
				<blockquote>
					<RichText
						tagName="p"
						className="genial-blocks-testimonial__quote"
						value={ a.quote }
						onChange={ ( value ) => set( { quote: value } ) }
						placeholder={ __(
							'Write a testimonial…',
							'genial-blocks'
						) }
					/>
				</blockquote>
				{ a.showRating && (
					<div
						className="genial-blocks-testimonial__rating"
						role="img"
						aria-label={ `${ a.rating } out of 5 stars` }
					>
						{ '★'.repeat( Math.round( a.rating || 0 ) ) }
					</div>
				) }
				<figcaption>
					<RichText
						tagName="strong"
						className="genial-blocks-testimonial__name"
						value={ a.name }
						onChange={ ( value ) => set( { name: value } ) }
					/>
					<span className="genial-blocks-testimonial__meta">
						<RichText
							tagName="span"
							className="genial-blocks-testimonial__role"
							value={ a.role }
							onChange={ ( value ) => set( { role: value } ) }
							placeholder={ __(
								'Role or title',
								'genial-blocks'
							) }
						/>
						{ a.company && <span aria-hidden="true"> · </span> }
						<RichText
							tagName="span"
							className="genial-blocks-testimonial__company"
							value={ a.company }
							onChange={ ( value ) => set( { company: value } ) }
							placeholder={ __( 'Company', 'genial-blocks' ) }
						/>
					</span>
				</figcaption>
			</figure>
		</>
	);
}
