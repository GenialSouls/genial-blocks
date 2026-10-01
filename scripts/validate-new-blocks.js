const fs = require( 'fs' );
const path = require( 'path' );

const root = path.resolve( __dirname, '..' );
const blocks = [ 'testimonial', 'team-member', 'countdown' ];
const expected = [
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
	...blocks,
];
const read = ( file ) => fs.readFileSync( path.join( root, file ), 'utf8' );
const assert = ( condition, message ) => {
	if ( ! condition ) {
		throw new Error( message );
	}
};

blocks.forEach( ( slug ) => {
	const block = JSON.parse( read( `src/blocks/${ slug }/block.json` ) );
	assert( block.name === `genial-blocks/${ slug }`, `${ slug } name` );
	assert(
		fs.existsSync( path.join( root, `src/blocks/${ slug }/save.js` ) ),
		`${ slug } save`
	);
	assert(
		fs.existsSync( path.join( root, `src/blocks/${ slug }/style.scss` ) ),
		`${ slug } style`
	);
	const source = [ 'save.js', 'edit.js', 'style.scss' ]
		.map( ( file ) => read( `src/blocks/${ slug }/${ file }` ) )
		.join( '\n' );
	assert(
		! source.includes( '!important' ),
		`${ slug } must not use !important`
	);
} );

const testimonial = read( 'src/blocks/testimonial/save.js' );
assert(
	testimonial.includes( '<blockquote>' ) &&
		testimonial.includes( 'role="img"' ),
	'testimonial semantics and rating'
);
assert( testimonial.includes( 'alt={ a.avatarAlt' ), 'testimonial image alt' );
const team = read( 'src/blocks/team-member/save.js' );
assert(
	team.includes( 'aria-label={ link.label }' ) &&
		team.includes( 'noopener noreferrer' ),
	'team social accessibility'
);
assert( team.includes( 'safeUrl' ), 'team URL safety' );
const countdown = read( 'src/blocks/countdown/view.js' );
assert(
	countdown.includes( 'Date.parse' ) && countdown.includes( 'Math.max( 0' ),
	'countdown deterministic and non-negative'
);
assert(
	countdown.includes( 'setInterval' ) &&
		countdown.includes( 'clearInterval' ),
	'countdown timer cleanup'
);
assert(
	read( 'src/blocks/countdown/block.json' ).includes( 'targetDate' ),
	'countdown target serialization'
);
assert(
	! read( 'genial-blocks.php' ).includes( 'Domain Path:' ),
	'obsolete Domain Path header removed'
);

console.log(
	`New block validation passed: ${ blocks.length } contracts and ${ expected.length } expected slugs.`
);
