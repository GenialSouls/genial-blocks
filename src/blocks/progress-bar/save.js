import { RichText, useBlockProps } from '@wordpress/block-editor';
const clamp = ( value, min, max ) =>
	Math.min( Math.max( Number.isFinite( value ) ? value : min, min ), max );
const css = ( a ) => ( {
	'--genial-progress-bar': a.barColor || undefined,
	'--genial-progress-track': a.trackColor || undefined,
	'--genial-progress-label': a.labelColor || undefined,
	'--genial-progress-height': `${ a.height || 12 }px`,
	'--genial-progress-radius': `${ a.radius || 999 }px`,
	'--genial-progress-spacing': `${ a.spacing || 8 }px`,
} );
export default function save( { attributes } ) {
	const min = Number.isFinite( attributes.minimum ) ? attributes.minimum : 0;
	const max = Math.max(
		min + 1,
		Number.isFinite( attributes.maximum ) ? attributes.maximum : 100
	);
	const value = clamp( attributes.value, min, max );
	const percent = ( ( value - min ) / ( max - min ) ) * 100;
	return (
		<div
			{ ...useBlockProps.save( {
				style: css( attributes ),
				'data-duration': attributes.duration,
			} ) }
		>
			<div className="genial-blocks-progress__header">
				<RichText.Content tagName="span" value={ attributes.label } />
				<span className="genial-blocks-progress__value">
					{ attributes.displayValue ||
						`${ value }${ attributes.suffix }` }
				</span>
			</div>
			<div
				className="genial-blocks-progress__track"
				role="progressbar"
				aria-valuemin={ min }
				aria-valuemax={ max }
				aria-valuenow={ value }
			>
				<span
					className="genial-blocks-progress__bar"
					style={ { width: `${ percent }%` } }
				/>
			</div>
		</div>
	);
}
