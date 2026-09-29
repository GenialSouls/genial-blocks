import { Path, SVG } from '@wordpress/primitives';

/**
 * Purpose-specific, lightweight icons for the Genial Blocks inserter.
 *
 * Each icon is intentionally a small native SVG primitive so it works in the
 * block inserter without an external icon dependency or raw SVG markup.
 *
 * @param {string[]} paths SVG path data for the icon.
 */
const icon = ( paths ) => (
	<SVG aria-hidden="true" focusable="false" viewBox="0 0 24 24">
		{ paths.map( ( path ) => (
			<Path key={ path } d={ path } />
		) ) }
	</SVG>
);

export const blockIcons = {
	advancedHeading: icon( [
		'M4 5h16v2H4V5Zm0 4h10v2H4V9Zm0 4h16v2H4v-2Zm0 4h8v2H4v-2Z',
	] ),
	advancedButton: icon( [
		'M4 6h16v12H4V6Zm2 2v8h12V8H6Zm3 3h5v2H9v-2Zm5-1 2 2-2 2v-1h-3v-2h3v-1Z',
	] ),
	infoBox: icon( [
		'M4 4h16v16H4V4Zm2 2v12h12V6H6Zm5 3h2v2h-2V9Zm0 3h2v4h-2v-4Z',
	] ),
	accordion: icon( [
		'M4 5h16v2H4V5Zm0 6h16v2H4v-2Zm0 6h16v2H4v-2Zm12-7h2v2h-2v-2Z',
	] ),
	counter: icon( [
		'M4 19V5h2v14H4Zm4 0V9h2v10H8Zm4 0V3h2v16h-2Zm4 0v-7h2v7h-2Z',
	] ),
	iconList: icon( [
		'M4 5h3v3H4V5Zm5 0h11v2H9V5ZM4 10h3v3H4v-3Zm5 0h11v2H9v-2ZM4 15h3v3H4v-3Zm5 0h11v2H9v-2Z',
	] ),
	tabs: icon( [
		'M3 5h8v4H3V5Zm10 0h8v4h-8V5ZM3 11h18v8H3v-8Zm2 2v4h14v-4H5Z',
	] ),
	pricingTable: icon( [
		'M4 4h16v16H4V4Zm2 2v3h12V6H6Zm0 5v7h3v-7H6Zm5 0v7h2v-7h-2Zm4 0v7h3v-7h-3Z',
	] ),
	progressBar: icon( [ 'M4 7h16v10H4V7Zm2 2v6h12V9H6Zm0 0v6h7V9H6Z' ] ),
	container: icon( [ 'M3 4h18v16H3V4Zm2 2v12h14V6H5Zm3 3h8v6H8V9Z' ] ),
};
