import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import {
	directionToCssValue,
	getDefaultResponsiveValues,
	getResponsiveStyles,
} from '../../shared/responsive';

const definitions = {
	maxWidth: {
		name: 'max-width',
		transform: ( value ) => {
			if ( value === 'full' ) {
				return 'none';
			}
			if ( value === 'wide' ) {
				return 'var(--genial-container-wide-width)';
			}
			return 'var(--genial-container-content-width)';
		},
	},
	direction: {
		name: 'direction',
		transform: directionToCssValue,
	},
	justify: 'justify',
	align: 'align',
	gap: 'gap',
};

export default function save( { attributes } ) {
	const responsive = {
		...getDefaultResponsiveValues(),
		...( attributes.responsive || {} ),
	};
	return (
		<div
			{ ...useBlockProps.save( {
				style: getResponsiveStyles( responsive, definitions ),
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
