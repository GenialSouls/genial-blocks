const fs = require( 'node:fs' );
const path = require( 'node:path' );

const root = path.resolve( __dirname, '..' );
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
	'testimonial',
	'team-member',
	'countdown',
];

function read( relative ) {
	return fs.readFileSync( path.join( root, relative ), 'utf8' );
}

function assert( condition, message ) {
	if ( ! condition ) {
		throw new Error( message );
	}
}

expected.forEach( ( block ) => {
	const metadata = JSON.parse( read( `build/blocks/${ block }/block.json` ) );
	assert(
		metadata.name === `genial-blocks/${ block }`,
		`${ block } metadata name`
	);
	assert( metadata.category === 'genial-blocks', `${ block } category` );
	assert(
		fs.existsSync( path.join( root, `build/blocks/${ block }/index.js` ) ),
		`${ block } editor asset`
	);
} );

const tabs =
	read( 'src/blocks/tabs/save.js' ) + read( 'src/blocks/tabs/view.js' );
assert(
	tabs.includes( 'aria-controls' ) && tabs.includes( 'role="tabpanel"' ),
	'Tabs relationships'
);
assert(
	tabs.includes( 'ArrowRight' ) &&
		tabs.includes( 'ArrowLeft' ) &&
		tabs.includes( 'Home' ) &&
		tabs.includes( 'End' ),
	'Tabs keyboard model'
);
assert( tabs.includes( 'getStableId' ), 'Tabs stable IDs' );

const pricing = read( 'src/blocks/pricing-table/save.js' );
assert(
	pricing.includes( '<ul>' ) &&
		pricing.includes( 'getSafeRel' ) &&
		read( 'src/shared/link.js' ).includes( 'noopener noreferrer' ),
	'Pricing semantic list and safe link'
);
assert( pricing.includes( 'features.map' ), 'Pricing repeatable features' );

const progress =
	read( 'src/blocks/progress-bar/save.js' ) +
	read( 'src/blocks/progress-bar/view.js' );
assert(
	progress.includes( 'role="progressbar"' ) &&
		progress.includes( 'aria-valuenow' ),
	'Progress ARIA'
);
assert(
	progress.includes( 'prefers-reduced-motion' ) &&
		progress.includes( 'Math.min' ),
	'Progress reduced motion and clamping'
);
assert( progress.includes( 'width:' ), 'Progress no-JS final width' );

const testimonial = read( 'src/blocks/testimonial/save.js' );
assert(
	testimonial.includes( '<blockquote>' ) &&
		testimonial.includes( 'avatarAlt' ),
	'Testimonial semantics and image alt'
);
assert(
	testimonial.includes( 'role="img"' ) &&
		testimonial.includes( 'aria-hidden="true"' ),
	'Testimonial rating accessibility'
);

const team = read( 'src/blocks/team-member/save.js' );
assert(
	team.includes( 'aria-label={ link.label }' ) &&
		team.includes( 'noopener noreferrer' ),
	'Team social link accessibility'
);
assert( team.includes( 'safeUrl' ), 'Team URL filtering' );

const countdown =
	read( 'src/blocks/countdown/save.js' ) +
	read( 'src/blocks/countdown/view.js' );
assert(
	countdown.includes( 'data-target-date' ) &&
		countdown.includes( 'Date.parse' ),
	'Countdown deterministic target'
);
assert(
	countdown.includes( 'setInterval' ) &&
		countdown.includes( 'clearInterval' ),
	'Countdown timer cleanup'
);
assert(
	countdown.includes( 'Math.max( 0' ),
	'Countdown non-negative completion'
);

console.log(
	`UG-08 validation passed: ${ expected.length }/13 block contracts and feature fixtures.`
);
