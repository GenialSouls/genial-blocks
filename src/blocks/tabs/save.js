import { RichText, useBlockProps } from '@wordpress/block-editor';
import { getStableId } from '../../shared/ids';

const css = ( a ) => ( {
	'--genial-tabs-active': a.activeTextColor || undefined,
	'--genial-tabs-inactive': a.inactiveTextColor || undefined,
	'--genial-tabs-active-bg': a.activeBackgroundColor || undefined,
	'--genial-tabs-inactive-bg': a.inactiveBackgroundColor || undefined,
	'--genial-tabs-content': a.contentColor || undefined,
	'--genial-tabs-content-bg': a.contentBackgroundColor || undefined,
	'--genial-tabs-border': a.borderColor || undefined,
	'--genial-tabs-radius': `${ a.borderRadius || 4 }px`,
	'--genial-tabs-gap': `${ a.tabSpacing || 4 }px`,
	'--genial-tabs-tab-padding': `${ a.tabPadding || 12 }px`,
	'--genial-tabs-content-padding': `${ a.contentPadding || 20 }px`,
} );
export default function save( { attributes } ) {
	const items = Array.isArray( attributes.items ) ? attributes.items : [];
	const active = items.some( ( item ) => item.id === attributes.activeTab )
		? attributes.activeTab
		: items[ 0 ]?.id;
	return (
		<div { ...useBlockProps.save( { style: css( attributes ) } ) }>
			<div
				className="genial-blocks-tabs__tablist"
				role="tablist"
				aria-label="Tabs"
			>
				{ items.map( ( item, index ) => {
					const id = getStableId( item.id, `tab-${ index + 1 }` );
					const panelId = `${ id }-panel`;
					return (
						<button
							key={ item.id }
							id={ id }
							type="button"
							role="tab"
							aria-selected={ item.id === active }
							aria-controls={ panelId }
							tabIndex={ item.id === active ? 0 : -1 }
							className={ item.id === active ? 'is-active' : '' }
						>
							<RichText.Content
								tagName="span"
								value={ item.title }
							/>
						</button>
					);
				} ) }
			</div>
			{ items.map( ( item, index ) => {
				const id = getStableId( item.id, `tab-${ index + 1 }` );
				const panelId = `${ id }-panel`;
				return (
					<div
						key={ item.id }
						id={ panelId }
						role="tabpanel"
						aria-labelledby={ id }
						tabIndex="0"
						className={ `genial-blocks-tabs__panel${
							item.id === active ? ' is-active' : ''
						}` }
						hidden={ item.id !== active }
					>
						<RichText.Content tagName="p" value={ item.content } />
					</div>
				);
			} ) }
		</div>
	);
}
