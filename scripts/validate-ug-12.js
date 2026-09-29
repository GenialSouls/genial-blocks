const fs = require( 'node:fs' );
const path = require( 'node:path' );

const root = path.resolve( __dirname, '..' );
const blocks = [ 'advanced-heading', 'advanced-button', 'info-box', 'accordion', 'counter', 'icon-list', 'tabs', 'pricing-table', 'progress-bar', 'container' ];
const iconKeys = [ 'advancedHeading', 'advancedButton', 'infoBox', 'accordion', 'counter', 'iconList', 'tabs', 'pricingTable', 'progressBar', 'container' ];
const read = ( file ) => fs.readFileSync( path.join( root, file ), 'utf8' );
const assert = ( condition, message ) => { if ( ! condition ) throw new Error( message ); };

blocks.forEach( ( block, index ) => {
	const metadata = JSON.parse( read( `src/blocks/${ block }/block.json` ) );
	assert( metadata.name === `genial-blocks/${ block }`, `${ block } name` );
	assert( metadata.category === 'genial-blocks', `${ block } category` );
	assert( metadata.version === '0.2.0', `${ block } version` );
	assert( metadata.keywords.includes( 'Genial' ), `${ block } keyword` );
	assert( read( `src/blocks/${ block }/index.js` ).includes( `blockIcons.${ iconKeys[ index ] }` ), `${ block } icon` );
} );

const icons = read( 'src/shared/block-icons.js' );
iconKeys.forEach( ( key ) => assert( icons.includes( `${ key }: icon(` ), `${ key } definition` ) );
const plugin = read( 'includes/class-genial-blocks.php' );
assert( plugin.includes( "'block_categories_all'" ) && plugin.includes( "'genial-blocks'" ), 'category registration' );
assert( plugin.includes( "__( 'Genial Blocks', 'genial-blocks' )" ), 'category title' );
const readme = read( 'readme.txt' );
assert( readme.includes( 'Source code: https://github.com/GenialSouls/genial-blocks' ), 'source disclosure' );
assert( ! /Node\.js|npm|Composer|npm run build|npm ci/i.test( readme ), 'developer build instructions in readme' );
console.log( 'UG-12 validation passed: 10/10 blocks, category, icons, keywords, and readme contract.' );
