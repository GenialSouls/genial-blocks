const fs = require( 'fs' );
const path = require( 'path' );

const root = path.resolve( __dirname, '..' );
const read = ( file ) => fs.readFileSync( path.join( root, file ), 'utf8' );
const metadata = ( block ) =>
	JSON.parse( read( `src/blocks/${ block }/block.json` ) );
const checks = [];
const check = ( name, condition ) =>
	checks.push( { name, pass: Boolean( condition ) } );

const adopted = [ 'advanced-button', 'info-box', 'pricing-table' ];
adopted.forEach( ( block ) => {
	const attributes = metadata( block ).attributes;
	check(
		`${ block } declares sparse responsive storage`,
		attributes.responsive?.type === 'object' &&
			JSON.stringify( attributes.responsive.default ) ===
				JSON.stringify( { desktop: {}, tablet: {}, mobile: {} } )
	);
} );

check(
	'shared utility supports per-block namespaces',
	read( 'src/shared/responsive.js' ).includes(
		"options.prefix || 'genial-container'"
	)
);
check(
	'shared utility removes reset values and empty devices',
	read( 'src/shared/responsive.js' ).includes( 'setResponsiveValue' ) &&
		read( 'src/shared/responsive.js' ).includes(
			'delete next[ breakpoint ][ key ]'
		)
);
check(
	'button width uses deterministic fallback chain',
	read( 'src/blocks/advanced-button/style.scss' ).includes(
		'genial-button-width-mobile'
	)
);
check(
	'info box placement uses deterministic fallback chain',
	read( 'src/blocks/info-box/style.scss' ).includes(
		'genial-info-box-icon-direction-mobile'
	)
);
check(
	'pricing alignment uses deterministic fallback chain',
	read( 'src/blocks/pricing-table/style.scss' ).includes(
		'genial-pricing-align-mobile'
	)
);
check(
	'responsive styling has no frontend view-script dependency',
	! read( 'src/shared/responsive.js' ).includes( '@wordpress/dom-ready' )
);

const registered = fs
	.readdirSync( path.join( root, 'src/blocks' ) )
	.filter( ( block ) =>
		fs.existsSync( path.join( root, 'src/blocks', block, 'block.json' ) )
	);
check(
	'thirteen block metadata contracts are present',
	registered.length === 13
);

const failed = checks.filter( ( item ) => ! item.pass );
checks.forEach( ( item, index ) =>
	console.log(
		`${ item.pass ? 'PASS' : 'FAIL' } ${ index + 1 }/${ checks.length }: ${
			item.name
		}`
	)
);
if ( failed.length ) {
	process.exitCode = 1;
} else {
	console.log(
		`UG-11 validation passed: ${ checks.length }/${ checks.length }`
	);
}
