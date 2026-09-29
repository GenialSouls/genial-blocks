import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TabPanel,
} from '@wordpress/components';
import {
	getDefaultResponsiveValues,
	getResponsiveStyles,
	setResponsiveValue,
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
	direction: 'direction',
	justify: 'justify',
	align: 'align',
	gap: 'gap',
};

const widthOptions = [
	{ label: __( 'Content width', 'genial-blocks' ), value: 'content' },
	{ label: __( 'Wide width', 'genial-blocks' ), value: 'wide' },
	{ label: __( 'Full width', 'genial-blocks' ), value: 'full' },
];
const directionOptions = [
	{ label: __( 'Vertical', 'genial-blocks' ), value: 'vertical' },
	{ label: __( 'Horizontal', 'genial-blocks' ), value: 'horizontal' },
];
const justifyOptions = [
	{ label: __( 'Start', 'genial-blocks' ), value: 'start' },
	{ label: __( 'Center', 'genial-blocks' ), value: 'center' },
	{ label: __( 'End', 'genial-blocks' ), value: 'end' },
	{ label: __( 'Space between', 'genial-blocks' ), value: 'space-between' },
];
const alignOptions = [
	{ label: __( 'Stretch', 'genial-blocks' ), value: 'stretch' },
	{ label: __( 'Start', 'genial-blocks' ), value: 'start' },
	{ label: __( 'Center', 'genial-blocks' ), value: 'center' },
	{ label: __( 'End', 'genial-blocks' ), value: 'end' },
];

function normalize( responsive ) {
	const defaults = getDefaultResponsiveValues();
	return {
		...defaults,
		...responsive,
		desktop: { ...defaults.desktop, ...( responsive?.desktop || {} ) },
		tablet: responsive?.tablet || {},
		mobile: responsive?.mobile || {},
	};
}

function ResponsivePanel( { breakpoint, values, fallback, onChange } ) {
	const getValue = ( key ) =>
		values?.[ key ] ?? ( breakpoint === 'desktop' ? fallback[ key ] : '' );
	return (
		<>
			<SelectControl
				label={ __( 'Width', 'genial-blocks' ) }
				value={ getValue( 'maxWidth' ) }
				options={ widthOptions }
				onChange={ ( value ) => onChange( 'maxWidth', value ) }
			/>
			<SelectControl
				label={ __( 'Direction', 'genial-blocks' ) }
				value={ getValue( 'direction' ) }
				options={ directionOptions }
				onChange={ ( value ) => onChange( 'direction', value ) }
			/>
			<SelectControl
				label={ __( 'Justification', 'genial-blocks' ) }
				value={ getValue( 'justify' ) }
				options={ justifyOptions }
				onChange={ ( value ) => onChange( 'justify', value ) }
			/>
			<SelectControl
				label={ __( 'Alignment', 'genial-blocks' ) }
				value={ getValue( 'align' ) }
				options={ alignOptions }
				onChange={ ( value ) => onChange( 'align', value ) }
			/>
			<RangeControl
				label={ __( 'Gap (px)', 'genial-blocks' ) }
				value={ getValue( 'gap' ) }
				min={ 0 }
				max={ 128 }
				onChange={ ( value ) => onChange( 'gap', value ) }
			/>
		</>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const responsive = normalize( attributes.responsive );
	const setResponsive = ( breakpoint, key, value ) => {
		setAttributes( {
			responsive: setResponsiveValue(
				responsive,
				breakpoint,
				key,
				value
			),
		} );
	};
	const blockProps = useBlockProps( {
		style: getResponsiveStyles( responsive, definitions ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		orientation:
			responsive.desktop.direction === 'horizontal'
				? 'horizontal'
				: 'vertical',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Responsive layout', 'genial-blocks' ) }
					initialOpen={ true }
				>
					<TabPanel
						tabs={ [
							{
								name: 'desktop',
								title: __( 'Desktop', 'genial-blocks' ),
							},
							{
								name: 'tablet',
								title: __( 'Tablet', 'genial-blocks' ),
							},
							{
								name: 'mobile',
								title: __( 'Mobile', 'genial-blocks' ),
							},
						] }
					>
						{ ( tab ) => (
							<ResponsivePanel
								breakpoint={ tab.name }
								values={ responsive[ tab.name ] }
								fallback={ responsive.desktop }
								onChange={ ( key, value ) =>
									setResponsive( tab.name, key, value )
								}
							/>
						) }
					</TabPanel>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
