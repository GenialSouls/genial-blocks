import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	ColorPalette,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
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
const newId = ( items ) => {
	let n = items.length + 1;
	while ( items.some( ( item ) => item.id === `tab-${ n }` ) ) {
		n += 1;
	}
	return `tab-${ n }`;
};

export default function Edit( { attributes, setAttributes } ) {
	const items =
		Array.isArray( attributes.items ) && attributes.items.length
			? attributes.items
			: [ { id: 'tab-1', title: 'Tab 1', content: '' } ];
	const active = items.some( ( item ) => item.id === attributes.activeTab )
		? attributes.activeTab
		: items[ 0 ].id;
	const update = ( index, values ) =>
		setAttributes( {
			items: items.map( ( item, i ) =>
				i === index ? { ...item, ...values } : item
			),
		} );
	const add = () => {
		const id = newId( items );
		setAttributes( {
			items: [
				...items,
				{ id, title: `Tab ${ items.length + 1 }`, content: '' },
			],
			activeTab: id,
		} );
	};
	const remove = ( index ) => {
		const next = items.filter( ( _, i ) => i !== index );
		setAttributes( {
			items: next,
			activeTab: next.some( ( item ) => item.id === active )
				? active
				: next[ 0 ]?.id || '',
		} );
	};
	const move = ( index, direction ) => {
		const target = index + direction;
		if ( target < 0 || target >= items.length ) {
			return;
		}
		const next = [ ...items ];
		[ next[ index ], next[ target ] ] = [ next[ target ], next[ index ] ];
		setAttributes( { items: next } );
	};
	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Colors', 'genial-blocks' ) }>
					<p>{ __( 'Active text', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.activeTextColor }
						onChange={ ( value ) =>
							setAttributes( { activeTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Inactive text', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.inactiveTextColor }
						onChange={ ( value ) =>
							setAttributes( { inactiveTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Active background', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.activeBackgroundColor }
						onChange={ ( value ) =>
							setAttributes( {
								activeBackgroundColor: value || '',
							} )
						}
						clearable
					/>
					<p>{ __( 'Content background', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.contentBackgroundColor }
						onChange={ ( value ) =>
							setAttributes( {
								contentBackgroundColor: value || '',
							} )
						}
						clearable
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Border color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.borderColor }
						onChange={ ( value ) =>
							setAttributes( { borderColor: value || '' } )
						}
						clearable
					/>
					<RangeControl
						label={ __( 'Radius (px)', 'genial-blocks' ) }
						value={ attributes.borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 48 }
					/>
					<RangeControl
						label={ __( 'Tab spacing (px)', 'genial-blocks' ) }
						value={ attributes.tabSpacing }
						onChange={ ( value ) =>
							setAttributes( { tabSpacing: value } )
						}
						min={ 0 }
						max={ 32 }
					/>
					<RangeControl
						label={ __( 'Tab padding (px)', 'genial-blocks' ) }
						value={ attributes.tabPadding }
						onChange={ ( value ) =>
							setAttributes( { tabPadding: value } )
						}
						min={ 4 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( 'Content padding (px)', 'genial-blocks' ) }
						value={ attributes.contentPadding }
						onChange={ ( value ) =>
							setAttributes( { contentPadding: value } )
						}
						min={ 0 }
						max={ 64 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps( { style: css( attributes ) } ) }>
				<div className="genial-blocks-tabs__tablist" role="tablist">
					{ items.map( ( item, index ) => {
						const id = getStableId( item.id, `tab-${ index + 1 }` );
						return (
							<div
								className="genial-blocks-tabs__tab-wrap"
								key={ item.id }
							>
								<button
									type="button"
									role="tab"
									aria-selected={ item.id === active }
									className={
										item.id === active ? 'is-active' : ''
									}
									onClick={ () =>
										setAttributes( { activeTab: item.id } )
									}
								>
									<RichText
										tagName="span"
										value={ item.title }
										onChange={ ( value ) =>
											update( index, { title: value } )
										}
										placeholder={ __(
											'Tab title',
											'genial-blocks'
										) }
									/>
								</button>
								<span id={ `${ id }-panel` } hidden />
								<div>
									<Button
										icon="arrow-left-alt2"
										label={ __(
											'Move left',
											'genial-blocks'
										) }
										onClick={ () => move( index, -1 ) }
										disabled={ index === 0 }
									/>
									<Button
										icon="arrow-right-alt2"
										label={ __(
											'Move right',
											'genial-blocks'
										) }
										onClick={ () => move( index, 1 ) }
										disabled={ index === items.length - 1 }
									/>
									<Button
										icon="no-alt"
										label={ __(
											'Remove tab',
											'genial-blocks'
										) }
										onClick={ () => remove( index ) }
										disabled={ items.length < 2 }
									/>
								</div>
							</div>
						);
					} ) }
					<Button variant="secondary" onClick={ add }>
						{ __( 'Add tab', 'genial-blocks' ) }
					</Button>
				</div>
				{ items.map( ( item, index ) => (
					<div
						key={ item.id }
						className="genial-blocks-tabs__panel"
						hidden={ item.id !== active }
					>
						<RichText
							tagName="p"
							value={ item.content }
							onChange={ ( value ) =>
								update( index, { content: value } )
							}
							placeholder={ __( 'Tab content', 'genial-blocks' ) }
						/>
					</div>
				) ) }
			</div>
		</>
	);
}
