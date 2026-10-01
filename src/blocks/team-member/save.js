import { RichText, useBlockProps } from '@wordpress/block-editor';

const safeUrl = ( url ) =>
	/^(https?:\/\/|\/|#)/i.test( url || '' ) ? url : '';
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

export default function save( { attributes: a } ) {
	const links = Array.isArray( a.socialLinks ) ? a.socialLinks : [];
	return (
		<article
			{ ...useBlockProps.save( {
				className: `has-team-member-align-${ a.alignment || 'center' }`,
				style: style( a ),
			} ) }
		>
			{ a.imageUrl && (
				<img
					className={ `genial-blocks-team-member__image is-${
						a.imageShape || 'circle'
					}` }
					src={ a.imageUrl }
					alt={ a.imageAlt || '' }
				/>
			) }
			<RichText.Content
				tagName="h3"
				className="genial-blocks-team-member__name"
				value={ a.name }
			/>
			<RichText.Content
				tagName="p"
				className="genial-blocks-team-member__designation"
				value={ a.designation }
			/>
			<RichText.Content
				tagName="p"
				className="genial-blocks-team-member__bio"
				value={ a.bio }
			/>
			{ links.some( ( link ) => safeUrl( link.url ) ) && (
				<nav
					className="genial-blocks-team-member__social"
					aria-label="Social links"
				>
					{ links
						.filter( ( link ) => safeUrl( link.url ) && link.label )
						.map( ( link ) => (
							<a
								key={ link.id || link.label }
								href={ safeUrl( link.url ) }
								target="_blank"
								rel="noopener noreferrer"
								aria-label={ link.label }
							>
								{ link.label }
							</a>
						) ) }
				</nav>
			) }
		</article>
	);
}
