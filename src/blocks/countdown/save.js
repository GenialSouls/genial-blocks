import { RichText, useBlockProps } from '@wordpress/block-editor';

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

export default function save( { attributes: a } ) {
	return (
		<div
			{ ...useBlockProps.save( {
				className: `has-countdown-align-${ a.alignment || 'center' }`,
				style: style( a ),
				'data-target-date': a.targetDate,
			} ) }
		>
			<div
				className="genial-blocks-countdown__items"
				aria-label="Countdown"
			>
				<span className="screen-reader-text">Time remaining</span>
				{ parts.map( ( [ key, label ] ) => (
					<div className="genial-blocks-countdown__item" key={ key }>
						<strong
							className="genial-blocks-countdown__number"
							data-unit={ key }
						>
							00
						</strong>
						<span className="genial-blocks-countdown__label">
							{ label }
						</span>
					</div>
				) ) }
			</div>
			<RichText.Content
				tagName="p"
				className="genial-blocks-countdown__complete"
				value={ a.completionMessage }
			/>
		</div>
	);
}
