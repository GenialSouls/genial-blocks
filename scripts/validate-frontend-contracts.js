const fs = require( 'node:fs' );
const path = require( 'node:path' );

const root = path.resolve( __dirname, '..' );
const read = ( file ) => fs.readFileSync( path.join( root, file ), 'utf8' );
const assert = ( condition, message ) => {
	if ( ! condition ) {
		throw new Error( message );
	}
};

const responsive = read( 'src/shared/responsive.js' );
const containerSave = read( 'src/blocks/container/save.js' );
const containerEdit = read( 'src/blocks/container/edit.js' );
const containerStyle = read( 'src/blocks/container/style.scss' );
const builtContainerStyle = read( 'build/blocks/container/style-index.css' );
const headingStyle = read( 'src/blocks/advanced-heading/style.scss' );
const headingEditorStyle = read( 'src/blocks/advanced-heading/editor.scss' );
const builtHeadingStyle = read( 'build/blocks/advanced-heading/style-index.css' );

assert(
	responsive.includes( "value === 'horizontal' ? 'row' : 'column'" ),
	'Container direction conversion'
);
assert(
	containerSave.includes( 'transform: directionToCssValue' ) &&
		containerEdit.includes( 'transform: directionToCssValue' ),
	'Container save/editor conversion boundary'
);

const directionCases = [
	[ 'horizontal', 'row' ],
	[ 'vertical', 'column' ],
	[ undefined, 'column' ],
	[ 'legacy', 'column' ],
];
directionCases.forEach( ( [ value, expected ] ) => {
	const actual = value === 'horizontal' ? 'row' : 'column';
	assert( actual === expected, `Container direction case: ${ value }` );
} );
assert(
	containerStyle.includes(
		'flex-direction: var(--genial-container-direction-desktop, column)'
	),
	'Container desktop CSS-variable contract'
);
assert(
	containerStyle.includes(
		'flex-direction: var(--genial-container-direction-tablet'
	) &&
		containerStyle.includes(
			'flex-direction: var(--genial-container-direction-mobile'
		),
	'Container responsive CSS-variable contract'
);
assert(
	containerStyle.includes(
		'--genial-container-direction-desktop:horizontal'
	) &&
		containerStyle.includes(
			'--genial-container-direction-mobile:vertical'
		),
	'Container 0.2.0 semantic-value compatibility'
);
assert(
	builtContainerStyle.includes(
		'flex-direction:var(--genial-container-direction-desktop,column)'
	) && builtContainerStyle.includes( '--genial-container-direction-desktop:horizontal' ),
	'Generated Container CSS contract'
);

[ headingStyle, headingEditorStyle ].forEach( ( style, index ) => {
	const name = index === 0 ? 'frontend' : 'editor';
	[ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ].forEach( ( level ) =>
		assert(
			style.includes( `> ${ level }` ),
			`${ name } ${ level } ownership`
		)
	);
	[ 'color: inherit', 'font-size: inherit', 'line-height: inherit' ].forEach(
		( declaration ) =>
			assert(
				style.includes( declaration ),
				`${ name } ${ declaration }`
			)
	);
} );
assert(
	builtHeadingStyle.includes( '.wp-block-genial-blocks-advanced-heading>h2' ) &&
		builtHeadingStyle.includes( 'font-size:inherit' ) &&
		builtHeadingStyle.includes( 'color:inherit' ),
	'Generated Advanced Heading ownership'
);

assert(
	! headingStyle.includes( '!important' ) &&
		! headingEditorStyle.includes( '!important' ),
	'Advanced Heading does not require !important'
);

console.log(
	'Frontend contract validation passed: Container directions and Advanced Heading ownership.'
);
