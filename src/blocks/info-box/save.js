import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from '../../shared/icons';
import { getSafeRel } from '../../shared/link';
import { getResponsiveStyles } from '../../shared/responsive';

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

export default function save( { attributes } ) {
	const {
		icon,
		iconPosition,
		iconSize,
		title,
		headingLevel,
		description,
		ctaText,
		url,
		opensInNewTab,
	} = attributes;
	const Heading = [ 'h2', 'h3', 'h4', 'h5', 'h6' ].includes( headingLevel )
		? headingLevel
		: 'h3';
	const blockProps = useBlockProps.save( {
		className: `has-icon-position-${ iconPosition || 'above' }`,
		style: getStyle( attributes ),
	} );

	return (
		<div { ...blockProps }>
			{ icon && (
				<span className="genial-blocks-info-box__icon">
					<Icon name={ icon } size={ iconSize } />
				</span>
			) }
			<div className="genial-blocks-info-box__content">
				<RichText.Content
					tagName={ Heading }
					className="genial-blocks-info-box__title"
					value={ title }
				/>
				<RichText.Content
					tagName="p"
					className="genial-blocks-info-box__description"
					value={ description }
				/>
				{ ctaText && (
					<RichText.Content
						tagName="a"
						className="genial-blocks-info-box__cta"
						value={ ctaText }
						href={ url || '#' }
						target={ opensInNewTab ? '_blank' : undefined }
						rel={ getSafeRel( opensInNewTab ) }
					/>
				) }
			</div>
		</div>
	);
}
