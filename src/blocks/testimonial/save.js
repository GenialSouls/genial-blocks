import { RichText, useBlockProps } from '@wordpress/block-editor';

const style = ( a ) => ( {
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
} );

export default function save( { attributes: a } ) {
	return (
		<figure
			{ ...useBlockProps.save( {
				className: `has-testimonial-align-${ a.alignment || 'left' }`,
				style: style( a ),
			} ) }
		>
			{ a.avatarUrl && (
				<img
					className={ `genial-blocks-testimonial__avatar is-${
						a.avatarShape || 'circle'
					}` }
					src={ a.avatarUrl }
					alt={ a.avatarAlt || '' }
				/>
			) }
			<blockquote>
				<RichText.Content
					tagName="p"
					className="genial-blocks-testimonial__quote"
					value={ a.quote }
				/>
			</blockquote>
			{ a.showRating && (
				<div
					className="genial-blocks-testimonial__rating"
					role="img"
					aria-label={ `${ a.rating } out of 5 stars` }
				>
					<span aria-hidden="true">
						{ '★'.repeat( Math.round( a.rating || 0 ) ) }
					</span>
				</div>
			) }
			<figcaption>
				<RichText.Content
					tagName="strong"
					className="genial-blocks-testimonial__name"
					value={ a.name }
				/>
				{ ( a.role || a.company ) && (
					<span className="genial-blocks-testimonial__meta">
						{ a.role && (
							<RichText.Content
								tagName="span"
								className="genial-blocks-testimonial__role"
								value={ a.role }
							/>
						) }
						{ a.role && a.company && (
							<span aria-hidden="true"> · </span>
						) }
						{ a.company && (
							<RichText.Content
								tagName="span"
								className="genial-blocks-testimonial__company"
								value={ a.company }
							/>
						) }
					</span>
				) }
			</figcaption>
		</figure>
	);
}
