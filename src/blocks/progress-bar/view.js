document
	.querySelectorAll( '.wp-block-genial-blocks-progress-bar' )
	.forEach( ( root ) => {
		const bar = root.querySelector( '.genial-blocks-progress__bar' );
		const progress = root.querySelector( '[role="progressbar"]' );
		if (
			! bar ||
			! progress ||
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches
		) {
			return;
		}
		const finalWidth = bar.style.width;
		bar.style.width = '0%';
		const duration = Math.max( Number( root.dataset.duration ) || 0, 0 );
		if ( ! duration ) {
			bar.style.width = finalWidth;
			return;
		}
		bar.style.transition = `width ${ duration }ms ease-out`;
		window.requestAnimationFrame( () => {
			bar.style.width = finalWidth;
		} );
	} );
