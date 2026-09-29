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
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { Icon } from '../../shared/icons';

const iconOptions = [
	{ label: __( 'Information', 'genial-blocks' ), value: 'info' },
	{ label: __( 'Check', 'genial-blocks' ), value: 'check' },
	{ label: __( 'Star', 'genial-blocks' ), value: 'star' },
	{ label: __( 'Lightbulb', 'genial-blocks' ), value: 'lightbulb' },
	{ label: __( 'Arrow', 'genial-blocks' ), value: 'arrow-right' },
];

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
	const { items } = attributes;
	const safeItems =
		Array.isArray( items ) && items.length
			? items
			: [
					{
						id: 'item-1',
						icon: 'check',
						text: '',
						url: '',
						opensInNewTab: false,
					},
			  ];
	const blockProps = useBlockProps( {
		className: `has-icon-list-align-${ attributes.alignment || 'left' }`,
		style: getStyle( attributes ),
	} );
	const updateItem = ( index, values ) =>
		setAttributes( {
			items: safeItems.map( ( item, itemIndex ) =>
				itemIndex === index ? { ...item, ...values } : item
			),
		} );
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
					title={ __( 'Layout & colors', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Alignment', 'genial-blocks' ) }
						value={ attributes.alignment }
						options={ [ 'left', 'center', 'right' ].map(
							( value ) => ( {
								label:
									value.charAt( 0 ).toUpperCase() +
									value.slice( 1 ),
								value,
							} )
						) }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
					<RangeControl
						label={ __( 'Icon size (px)', 'genial-blocks' ) }
						value={ attributes.iconSize }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
						min={ 12 }
						max={ 64 }
					/>
					<RangeControl
						label={ __( 'Icon/text gap (px)', 'genial-blocks' ) }
						value={ attributes.iconGap }
						onChange={ ( value ) =>
							setAttributes( { iconGap: value } )
						}
						min={ 0 }
						max={ 48 }
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
					<p>{ __( 'Icon color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.iconColor }
						onChange={ ( value ) =>
							setAttributes( { iconColor: value || '' } )
						}
						clearable
					/>
					<p>{ __( 'Text color', 'genial-blocks' ) }</p>
					<ColorPalette
						value={ attributes.textColor }
						onChange={ ( value ) =>
							setAttributes( { textColor: value || '' } )
						}
						clearable
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<ul>
					{ safeItems.map( ( item, index ) => (
						<li key={ item.id }>
							<span className="genial-blocks-icon-list__icon">
								<Icon
									name={ item.icon }
									size={ attributes.iconSize }
								/>
							</span>
							<RichText
								tagName="span"
								value={ item.text }
								onChange={ ( value ) =>
									updateItem( index, { text: value } )
								}
								placeholder={ __(
									'List item text…',
									'genial-blocks'
								) }
								aria-label={ __(
									'List item text',
									'genial-blocks'
								) }
							/>
							<div className="genial-blocks-icon-list__item-tools">
								<SelectControl
									label={ __( 'Icon', 'genial-blocks' ) }
									hideLabelFromVision
									value={ item.icon }
									options={ iconOptions }
									onChange={ ( value ) =>
										updateItem( index, { icon: value } )
									}
								/>
								<TextControl
									label={ __( 'URL', 'genial-blocks' ) }
									hideLabelFromVision
									type="url"
									value={ item.url }
									onChange={ ( value ) =>
										updateItem( index, { url: value } )
									}
								/>
								<ToggleControl
									label={ __( 'New tab', 'genial-blocks' ) }
									checked={ item.opensInNewTab }
									onChange={ ( value ) =>
										updateItem( index, {
											opensInNewTab: value,
										} )
									}
								/>
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
									onClick={ () =>
										setAttributes( {
											items: safeItems.filter(
												( _, itemIndex ) =>
													itemIndex !== index
											),
										} )
									}
								/>
							</div>
						</li>
					) ) }
				</ul>
				<Button
					variant="secondary"
					onClick={ () =>
						setAttributes( {
							items: [
								...safeItems,
								{
									id: nextItemId( safeItems ),
									icon: 'check',
									text: '',
									url: '',
									opensInNewTab: false,
								},
							],
						} )
					}
				>
					{ __( 'Add list item', 'genial-blocks' ) }
				</Button>
			</div>
		</>
	);
}
