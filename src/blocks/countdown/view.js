function validTarget( value ) {
	const time = Date.parse( value || '' );
	return Number.isFinite( time ) ? time : null;
}
function update( root, remaining ) {
	Object.entries( remaining ).forEach( ( [ unit, value ] ) => {
		const node = root.querySelector( `[data-unit="${ unit }"]` );
		if ( node ) {
			node.textContent = String( Math.max( 0, value ) ).padStart(
				2,
				'0'
			);
		}
	} );
}
function init( root ) {
	const target = validTarget( root.dataset.targetDate );
	if ( target === null ) {
		root.classList.add( 'is-invalid' );
		return;
	}
	const complete = root.querySelector( '.genial-blocks-countdown__complete' );
	const tick = () => {
		const total = Math.max( 0, target - Date.now() );
		const seconds = Math.floor( total / 1000 );
		const remaining = {
			days: Math.floor( seconds / 86400 ),
			hours: Math.floor( seconds / 3600 ) % 24,
			minutes: Math.floor( seconds / 60 ) % 60,
			seconds: seconds % 60,
		};
		update( root, remaining );
		if ( total <= 0 ) {
			root.classList.add( 'is-complete' );
			if ( complete ) {
				complete.hidden = false;
			}
			return false;
		}
		return true;
	};
	if ( complete ) {
		complete.hidden = true;
	}
	if ( tick() ) {
		const timer = window.setInterval( () => {
			if ( ! tick() ) {
				window.clearInterval( timer );
			}
		}, 1000 );
	}
}
document
	.querySelectorAll( '.wp-block-genial-blocks-countdown' )
	.forEach( init );
