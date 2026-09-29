const fs = require( 'node:fs' );
const path = require( 'node:path' );

const root = path.resolve( __dirname, '..' );
const blocks = [
	'advanced-heading',
	'advanced-button',
	'info-box',
	'accordion',
	'counter',
	'icon-list',
	'tabs',
	'pricing-table',
	'progress-bar',
	'container',
];

const read = ( file ) => fs.readFileSync( path.join( root, file ), 'utf8' );
const assert = ( condition, message ) => {
	if ( ! condition ) {
		throw new Error( message );
	}
};

blocks.forEach( ( block ) => {
	const metadata = JSON.parse(
		read( 'build/blocks/' + block + '/block.json' )
	);
	assert( metadata.name === 'genial-blocks/' + block, block + ' name' );
	assert(
		fs.existsSync(
			path.join( root, 'build/blocks/' + block + '/index.js' )
		),
		block + ' asset'
	);
} );

const container =
	read( 'src/blocks/container/edit.js' ) +
	read( 'src/blocks/container/save.js' );
assert( container.includes( 'InnerBlocks' ), 'Container nesting' );
assert(
	container.includes( 'desktop' ) &&
		container.includes( 'tablet' ) &&
		container.includes( 'mobile' ),
	'Responsive model'
);
assert(
	container.includes( 'getResponsiveStyles' ),
	'Shared responsive utility'
);
assert(
	read( 'src/blocks/container/block.json' ).includes( '"layout"' ),
	'Native layout support'
);

console.log(
	'UG-10 validation passed: 10/10 metadata contracts and Container architecture fixtures.'
);
