function parseNumber( value, fallback ) {
	const parsed = Number.parseFloat( value );
	return Number.isFinite( parsed ) ? parsed : fallback;
}

function formatValue( value, decimals ) {
	return value.toFixed( Math.min( Math.max( decimals, 0 ), 4 ) );
}

function animateCounter( element ) {
	const start = parseNumber( element.dataset.start, 0 );
	const end = parseNumber( element.dataset.end, start );
	const decimals = parseNumber( element.dataset.decimals, 0 );
	const duration = Math.max( parseNumber( element.dataset.duration, 0 ), 0 );
	if (
		duration === 0 ||
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
	) {
		element.textContent = formatValue( end, decimals );
		return;
	}
	const started = performance.now();
	const tick = ( now ) => {
		const progress = Math.min( ( now - started ) / duration, 1 );
		const eased = 1 - Math.pow( 1 - progress, 3 );
		element.textContent = formatValue(
			start + ( end - start ) * eased,
			decimals
		);
		if ( progress < 1 ) {
			window.requestAnimationFrame( tick );
		}
	};
	window.requestAnimationFrame( tick );
}

document
	.querySelectorAll(
		'.wp-block-genial-blocks-counter .genial-blocks-counter__value'
	)
	.forEach( animateCounter );
