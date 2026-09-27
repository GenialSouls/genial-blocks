import { RichText, useBlockProps } from '@wordpress/block-editor';

const headingLevels = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];

export default function save( { attributes } ) {
	const {
		content,
		headingLevel,
		subtitle,
		subtitleEnabled,
		subtitleFontSize,
		subtitleTextColor,
		subtitleMarginTop,
	} = attributes;
	const Heading = headingLevels.includes( headingLevel )
		? headingLevel
		: 'h2';
	const blockProps = useBlockProps.save();
	const subtitleStyle = {
		color: subtitleTextColor || undefined,
		marginTop: `${
			Number.isFinite( subtitleMarginTop ) ? subtitleMarginTop : 8
		}px`,
	};

	return (
		<div { ...blockProps }>
			<RichText.Content tagName={ Heading } value={ content } />
			{ subtitleEnabled && subtitle && (
				<RichText.Content
					tagName="p"
					className={ `genial-blocks-advanced-heading__subtitle has-subtitle-font-size-${
						subtitleFontSize || 'default'
					}` }
					value={ subtitle }
					style={ subtitleStyle }
				/>
			) }
		</div>
	);
}
