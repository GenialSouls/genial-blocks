import { useBlockProps } from '@wordpress/block-editor';

function getStyle( attributes ) {
	return {
		'--genial-blocks-counter-number-color':
			attributes.numberColor || undefined,
		'--genial-blocks-counter-label-color':
			attributes.labelColor || undefined,
		'--genial-blocks-counter-spacing': `${
			Number.isFinite( attributes.spacing ) ? attributes.spacing : 8
		}px`,
	};
}

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		className: `has-counter-align-${ attributes.alignment || 'center' }`,
		style: getStyle( attributes ),
	} );
	return (
		<div { ...blockProps }>
			<span className="genial-blocks-counter__number">
				{ attributes.prefix }
				<span
					className="genial-blocks-counter__value"
					data-start={ attributes.startValue }
					data-end={ attributes.endValue }
					data-decimals={ attributes.decimals }
					data-duration={ attributes.duration }
				>
					{ attributes.endValue }
				</span>
				{ attributes.suffix }
			</span>
			{ attributes.label && (
				<span className="genial-blocks-counter__label">
					{ attributes.label }
				</span>
			) }
		</div>
	);
}
