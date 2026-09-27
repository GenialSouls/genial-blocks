import { RichText, useBlockProps } from '@wordpress/block-editor';

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

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: `has-button-width-${ attributes.width || 'auto' }`,
	} );
	const rel = attributes.opensInNewTab ? 'noopener noreferrer' : undefined;

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="a"
				className="genial-blocks-advanced-button__link"
				value={ attributes.text }
				href={ attributes.url || '#' }
				target={ attributes.opensInNewTab ? '_blank' : undefined }
				rel={ rel }
				style={ getButtonStyle( attributes ) }
			/>
		</div>
	);
}
