import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from '../../shared/icons';
import { getSafeRel } from '../../shared/link';

function getStyle( attributes ) {
	return {
		'--genial-blocks-icon-list-icon-color':
			attributes.iconColor || undefined,
		'--genial-blocks-icon-list-text-color':
			attributes.textColor || undefined,
		'--genial-blocks-icon-list-item-spacing': `${
			Number.isFinite( attributes.itemSpacing )
				? attributes.itemSpacing
				: 12
		}px`,
		'--genial-blocks-icon-list-icon-gap': `${
			Number.isFinite( attributes.iconGap ) ? attributes.iconGap : 10
		}px`,
		'--genial-blocks-icon-list-icon-size': `${
			Number.isFinite( attributes.iconSize ) ? attributes.iconSize : 24
		}px`,
	};
}

export default function save( { attributes } ) {
	const items = Array.isArray( attributes.items ) ? attributes.items : [];
	const blockProps = useBlockProps.save( {
		className: `has-icon-list-align-${ attributes.alignment || 'left' }`,
		style: getStyle( attributes ),
	} );
	return (
		<div { ...blockProps }>
			<ul>
				{ items.map( ( item, index ) => (
					<li key={ item.id || `item-${ index + 1 }` }>
						<span className="genial-blocks-icon-list__icon">
							<Icon
								name={ item.icon }
								size={ attributes.iconSize }
							/>
						</span>
						{ item.url ? (
							<RichText.Content
								tagName="a"
								value={ item.text }
								href={ item.url }
								target={
									item.opensInNewTab ? '_blank' : undefined
								}
								rel={ getSafeRel( item.opensInNewTab ) }
							/>
						) : (
							<RichText.Content
								tagName="span"
								value={ item.text }
							/>
						) }
					</li>
				) ) }
			</ul>
		</div>
	);
}
