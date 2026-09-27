const fs = require( 'node:fs' );
const path = require( 'node:path' );

const blockName = process.argv[ 2 ];
if ( ! blockName ) {
	throw new Error( 'A block name is required.' );
}

const outputDir = path.resolve( __dirname, '..', 'build', 'blocks', blockName );
const sourceMetadata = path.resolve( __dirname, '..', 'src', 'blocks', blockName, 'block.json' );
const metadata = path.join( outputDir, 'block.json' );

if ( ! fs.existsSync( sourceMetadata ) ) {
	throw new Error( `Expected source metadata at ${ sourceMetadata }` );
}

fs.copyFileSync( sourceMetadata, metadata );
fs.rmSync( path.join( outputDir, 'blocks' ), { recursive: true, force: true } );
