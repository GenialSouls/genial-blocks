// Return only configured responsive values as CSS custom properties.
// Empty tablet/mobile values inherit through the CSS fallback chain.
export function getResponsiveStyles(
	values = {},
	definitions = {},
	options = {}
) {
	const styles = {};
	const prefix = options.prefix || 'genial-container';

	Object.entries( definitions ).forEach( ( [ key, definition ] ) => {
		const variable =
			typeof definition === 'string' ? definition : definition.name;
		const transform =
			typeof definition === 'string'
				? ( value ) => value
				: definition.transform || ( ( value ) => value );
		[ 'desktop', 'tablet', 'mobile' ].forEach( ( breakpoint ) => {
			const value = values?.[ breakpoint ]?.[ key ];
			if ( value !== undefined && value !== '' && value !== null ) {
				styles[ '--' + prefix + '-' + variable + '-' + breakpoint ] =
					transform( value );
			}
		} );
	} );

	return styles;
}

export function setResponsiveValue( values = {}, breakpoint, key, value ) {
	const next = {
		desktop: { ...( values.desktop || {} ) },
		tablet: { ...( values.tablet || {} ) },
		mobile: { ...( values.mobile || {} ) },
	};
	if ( value === undefined || value === null || value === '' ) {
		delete next[ breakpoint ][ key ];
	} else {
		next[ breakpoint ][ key ] = value;
	}
	[ 'desktop', 'tablet', 'mobile' ].forEach( ( device ) => {
		if ( Object.keys( next[ device ] ).length === 0 ) {
			delete next[ device ];
		}
	} );
	return next;
}

export function getDefaultResponsiveValues() {
	return {
		desktop: {
			maxWidth: 'content',
			direction: 'vertical',
			justify: 'start',
			align: 'stretch',
			gap: 24,
		},
		tablet: {},
		mobile: {},
	};
}
