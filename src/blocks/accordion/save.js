import { RichText, useBlockProps } from '@wordpress/block-editor';
import { getStableId } from '../../shared/ids';

function getStyle( attributes ) {
	return {
		'--genial-blocks-accordion-title-color':
			attributes.titleTextColor || undefined,
		'--genial-blocks-accordion-content-color':
			attributes.contentTextColor || undefined,
		'--genial-blocks-accordion-background':
			attributes.backgroundColor || undefined,
		'--genial-blocks-accordion-open-background':
			attributes.openBackgroundColor || undefined,
		'--genial-blocks-accordion-border-color':
			attributes.borderColor || undefined,
		'--genial-blocks-accordion-border-style':
			attributes.borderStyle || 'solid',
		'--genial-blocks-accordion-border-width': `${
			Number.isFinite( attributes.borderWidth )
				? attributes.borderWidth
				: 1
		}px`,
		'--genial-blocks-accordion-radius': `${
			Number.isFinite( attributes.borderRadius )
				? attributes.borderRadius
				: 6
		}px`,
		'--genial-blocks-accordion-item-spacing': `${
			Number.isFinite( attributes.itemSpacing )
				? attributes.itemSpacing
				: 8
		}px`,
		'--genial-blocks-accordion-content-padding': `${
			Number.isFinite( attributes.contentPadding )
				? attributes.contentPadding
				: 16
		}px`,
		'--genial-blocks-accordion-indicator-color':
			attributes.indicatorColor || undefined,
	};
}

export default function save( { attributes } ) {
	const items = Array.isArray( attributes.items ) ? attributes.items : [];
	const openItems = Array.isArray( attributes.openItems )
		? attributes.openItems
		: [];
	const blockProps = useBlockProps.save( {
		'data-allow-multiple': attributes.allowMultiple ? 'true' : 'false',
		style: getStyle( attributes ),
	} );

	return (
		<div { ...blockProps }>
			{ items.map( ( item, index ) => {
				const id = getStableId( item.id, `item-${ index + 1 }` );
				const panelId = `${ id }-panel`;
				const isOpen = openItems.includes( item.id );
				return (
					<div
						className={ `genial-blocks-accordion__item${
							isOpen ? ' is-open' : ''
						}` }
						key={ item.id }
					>
						<h3 className="genial-blocks-accordion__heading">
							<RichText.Content
								tagName="button"
								value={ item.title }
								type="button"
								aria-expanded={ isOpen }
								aria-controls={ panelId }
							/>
						</h3>
						<div
							id={ panelId }
							className="genial-blocks-accordion__panel"
							hidden={ ! isOpen }
						>
							<RichText.Content
								tagName="p"
								value={ item.content }
							/>
						</div>
					</div>
				);
			} ) }
		</div>
	);
}
