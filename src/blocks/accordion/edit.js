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
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { getStableId } from '../../shared/ids';

const borderStyles = [ 'none', 'solid', 'dashed', 'dotted' ];

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

function nextItemId( items ) {
	let number = items.length + 1;
	let id = `item-${ number }`;
	while ( items.some( ( item ) => item.id === id ) ) {
		number += 1;
		id = `item-${ number }`;
	}
	return id;
}

export default function Edit( { attributes, setAttributes } ) {
	const { items, openItems, allowMultiple } = attributes;
	const safeItems =
		Array.isArray( items ) && items.length
			? items
			: [ { id: 'item-1', title: '', content: '' } ];
	const safeOpenItems = Array.isArray( openItems ) ? openItems : [];
	const blockProps = useBlockProps( { style: getStyle( attributes ) } );
	const updateItem = ( index, values ) =>
		setAttributes( {
			items: safeItems.map( ( item, itemIndex ) =>
				itemIndex === index ? { ...item, ...values } : item
			),
		} );
	const toggleItem = ( id ) => {
		const isOpen = safeOpenItems.includes( id );
		let nextOpenItems;
		if ( isOpen ) {
			nextOpenItems = safeOpenItems.filter( ( itemId ) => itemId !== id );
		} else if ( allowMultiple ) {
			nextOpenItems = [ ...safeOpenItems, id ];
		} else {
			nextOpenItems = [ id ];
		}
		setAttributes( {
			openItems: nextOpenItems,
		} );
	};
	const addItem = () => {
		const id = nextItemId( safeItems );
		setAttributes( {
			items: [ ...safeItems, { id, title: '', content: '' } ],
			openItems: allowMultiple ? [ ...safeOpenItems, id ] : [ id ],
		} );
	};
	const removeItem = ( index ) => {
		const id = safeItems[ index ].id;
		setAttributes( {
			items: safeItems.filter( ( _, itemIndex ) => itemIndex !== index ),
			openItems: safeOpenItems.filter( ( itemId ) => itemId !== id ),
		} );
	};
	const moveItem = ( index, direction ) => {
		const nextIndex = index + direction;
		if ( nextIndex < 0 || nextIndex >= safeItems.length ) {
			return;
		}
		const nextItems = [ ...safeItems ];
		[ nextItems[ index ], nextItems[ nextIndex ] ] = [
			nextItems[ nextIndex ],
			nextItems[ index ],
		];
		setAttributes( { items: nextItems } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Behavior', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __(
							'Allow multiple items open',
							'genial-blocks'
						) }
						checked={ allowMultiple }
						onChange={ ( value ) =>
							setAttributes( {
								allowMultiple: value,
								openItems: value
									? safeOpenItems
									: safeOpenItems.slice( 0, 1 ),
							} )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<p>{ __( 'Title color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.titleTextColor }
						onChange={ ( value ) =>
							setAttributes( { titleTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Content color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.contentTextColor }
						onChange={ ( value ) =>
							setAttributes( { contentTextColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Background', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.backgroundColor }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Open background', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.openBackgroundColor }
						onChange={ ( value ) =>
							setAttributes( {
								openBackgroundColor: value || '',
							} )
						}
						clearable
					/>
					<p>{ __( 'Border', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.borderColor }
						onChange={ ( value ) =>
							setAttributes( { borderColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Indicator', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.indicatorColor }
						onChange={ ( value ) =>
							setAttributes( { indicatorColor: value || '' } )
						}
						clearable
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Border & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Border style', 'genial-blocks' ) }
						value={ attributes.borderStyle }
						options={ borderStyles.map( ( value ) => ( {
							label:
								value.charAt( 0 ).toUpperCase() +
								value.slice( 1 ),
							value,
						} ) ) }
						onChange={ ( value ) =>
							setAttributes( { borderStyle: value } )
						}
					/>
					<RangeControl
						label={ __( 'Border width (px)', 'genial-blocks' ) }
						value={ attributes.borderWidth }
						onChange={ ( value ) =>
							setAttributes( { borderWidth: value } )
						}
						min={ 0 }
						max={ 12 }
					/>
					<RangeControl
						label={ __( 'Border radius (px)', 'genial-blocks' ) }
						value={ attributes.borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 64 }
					/>
					<RangeControl
						label={ __( 'Item spacing (px)', 'genial-blocks' ) }
						value={ attributes.itemSpacing }
						onChange={ ( value ) =>
							setAttributes( { itemSpacing: value } )
						}
						min={ 0 }
						max={ 48 }
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
			<div { ...blockProps }>
				{ safeItems.map( ( item, index ) => {
					const id = getStableId( item.id, `item-${ index + 1 }` );
					const isOpen = safeOpenItems.includes( item.id );
					const panelId = `${ id }-panel`;
					return (
						<div
							className={ `genial-blocks-accordion__item${
								isOpen ? ' is-open' : ''
							}` }
							key={ item.id }
						>
							<div className="genial-blocks-accordion__item-tools">
								<Button
									icon="arrow-up-alt2"
									label={ __(
										'Move item up',
										'genial-blocks'
									) }
									disabled={ index === 0 }
									onClick={ () => moveItem( index, -1 ) }
								/>
								<Button
									icon="arrow-down-alt2"
									label={ __(
										'Move item down',
										'genial-blocks'
									) }
									disabled={ index === safeItems.length - 1 }
									onClick={ () => moveItem( index, 1 ) }
								/>
								<Button
									icon="trash"
									label={ __(
										'Remove item',
										'genial-blocks'
									) }
									onClick={ () => removeItem( index ) }
								/>
							</div>
							<h3 className="genial-blocks-accordion__heading">
								<button
									type="button"
									aria-expanded={ isOpen }
									aria-controls={ panelId }
									onClick={ () => toggleItem( item.id ) }
								>
									<RichText
										tagName="span"
										value={ item.title }
										onChange={ ( value ) =>
											updateItem( index, {
												title: value,
											} )
										}
										onClick={ ( event ) =>
											event.stopPropagation()
										}
										placeholder={ __(
											'Accordion item',
											'genial-blocks'
										) }
										aria-label={ __(
											'Accordion item title',
											'genial-blocks'
										) }
									/>
								</button>
							</h3>
							{ isOpen && (
								<div
									id={ panelId }
									className="genial-blocks-accordion__panel"
								>
									<RichText
										tagName="p"
										value={ item.content }
										onChange={ ( value ) =>
											updateItem( index, {
												content: value,
											} )
										}
										placeholder={ __(
											'Write accordion content…',
											'genial-blocks'
										) }
										aria-label={ __(
											'Accordion content',
											'genial-blocks'
										) }
									/>
								</div>
							) }
						</div>
					);
				} ) }
				<Button variant="secondary" onClick={ addItem }>
					{ __( 'Add accordion item', 'genial-blocks' ) }
				</Button>
			</div>
		</>
	);
}
