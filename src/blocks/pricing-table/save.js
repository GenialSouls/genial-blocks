import { RichText, useBlockProps } from '@wordpress/block-editor';
import { getSafeRel } from '../../shared/link';
import { getResponsiveStyles } from '../../shared/responsive';

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
export default function save( { attributes } ) {
	const features = Array.isArray( attributes.features )
		? attributes.features
		: [];
	const target = attributes.opensInNewTab ? '_blank' : undefined;
	const rel = getSafeRel( attributes.opensInNewTab );
	return (
		<div { ...useBlockProps.save( { style: css( attributes ) } ) }>
			<RichText.Content
				tagName="div"
				className="genial-blocks-pricing__badge"
				value={ attributes.badge }
			/>
			<RichText.Content tagName="h3" value={ attributes.planName } />
			<RichText.Content
				tagName="p"
				className="genial-blocks-pricing__subtitle"
				value={ attributes.subtitle }
			/>
			<div className="genial-blocks-pricing__price">
				<RichText.Content
					tagName="span"
					value={ attributes.currency }
				/>
				<RichText.Content tagName="strong" value={ attributes.price } />
				{ attributes.previousPrice && (
					<RichText.Content
						tagName="del"
						value={ attributes.previousPrice }
					/>
				) }
				<RichText.Content
					tagName="small"
					value={ attributes.billingPeriod }
				/>
			</div>
			<ul>
				{ features.map( ( feature ) => (
					<li key={ feature.id }>
						<RichText.Content
							tagName="span"
							value={ feature.text }
						/>
					</li>
				) ) }
			</ul>
			{ attributes.ctaText && (
				<RichText.Content
					tagName="a"
					className="genial-blocks-pricing__cta"
					href={ attributes.ctaUrl || '#' }
					target={ target }
					rel={ rel || undefined }
					value={ attributes.ctaText }
				/>
			) }
		</div>
	);
}
