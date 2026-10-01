import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	ColorPalette,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';

const style = ( a ) => ( {
	'--genial-countdown-number': a.numberColor || undefined,
	'--genial-countdown-label': a.labelColor || undefined,
	'--genial-countdown-item': a.itemBackground || undefined,
	'--genial-countdown-border': a.borderColor || undefined,
	'--genial-countdown-radius': `${
		Number.isFinite( a.borderRadius ) ? a.borderRadius : 8
	}px`,
	'--genial-countdown-gap': `${ Number.isFinite( a.gap ) ? a.gap : 12 }px`,
} );
const parts = [
	[ 'days', 'Days' ],
	[ 'hours', 'Hours' ],
	[ 'minutes', 'Minutes' ],
	[ 'seconds', 'Seconds' ],
];

export default function Edit( { attributes: a, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `has-countdown-align-${ a.alignment || 'center' }`,
		style: style( a ),
	} );
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Timer', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __(
							'Target date and time (ISO 8601 UTC)',
							'genial-blocks'
						) }
						help={ __(
							'Use a value such as 2030-01-01T00:00:00.000Z for deterministic UTC behavior.',
							'genial-blocks'
						) }
						value={ a.targetDate }
						onChange={ ( value ) =>
							setAttributes( { targetDate: value } )
						}
					/>
					<SelectControl
						label={ __( 'Alignment', 'genial-blocks' ) }
						value={ a.alignment }
						options={ [ 'left', 'center', 'right' ].map(
							( value ) => ( {
								label: value,
								value,
							} )
						) }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
					<RichText
						tagName="p"
						label={ __( 'Completion message', 'genial-blocks' ) }
						value={ a.completionMessage }
						onChange={ ( value ) =>
							setAttributes( { completionMessage: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors & spacing', 'genial-blocks' ) }
					initialOpen={ false }
				>
					{ [
						[ 'numberColor', 'Number color' ],
						[ 'labelColor', 'Label color' ],
						[ 'itemBackground', 'Item background' ],
						[ 'borderColor', 'Border' ],
					].map( ( [ key, label ] ) => (
						<div key={ key }>
							<p>{ label }</p>
							<ColorPalette
								value={ a[ key ] }
								onChange={ ( value ) =>
									setAttributes( { [ key ]: value || '' } )
								}
								clearable
							/>
						</div>
					) ) }
					<RangeControl
						label={ __( 'Gap (px)', 'genial-blocks' ) }
						value={ a.gap }
						min={ 0 }
						max={ 64 }
						onChange={ ( value ) =>
							setAttributes( { gap: value } )
						}
					/>
					<RangeControl
						label={ __( 'Border radius (px)', 'genial-blocks' ) }
						value={ a.borderRadius }
						min={ 0 }
						max={ 64 }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps } data-target-date={ a.targetDate }>
				<div className="genial-blocks-countdown__items">
					{ parts.map( ( [ key, label ] ) => (
						<div
							className="genial-blocks-countdown__item"
							key={ key }
						>
							<strong className="genial-blocks-countdown__number">
								00
							</strong>
							<span className="genial-blocks-countdown__label">
								{ label }
							</span>
						</div>
					) ) }
				</div>
				<RichText
					tagName="p"
					className="genial-blocks-countdown__complete"
					value={ a.completionMessage }
					onChange={ ( value ) =>
						setAttributes( { completionMessage: value } )
					}
					placeholder={ __( 'Completion message', 'genial-blocks' ) }
				/>
			</div>
		</>
	);
}
