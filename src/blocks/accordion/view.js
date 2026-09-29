function setItemState( item, open ) {
	const button = item.querySelector(
		'.genial-blocks-accordion__heading button'
	);
	const panel = item.querySelector( '.genial-blocks-accordion__panel' );
	if ( ! button || ! panel ) {
		return;
	}
	button.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
	panel.hidden = ! open;
	item.classList.toggle( 'is-open', open );
}

document
	.querySelectorAll( '.wp-block-genial-blocks-accordion' )
	.forEach( ( accordion ) => {
		const allowMultiple = accordion.dataset.allowMultiple === 'true';
		accordion
			.querySelectorAll( '.genial-blocks-accordion__heading button' )
			.forEach( ( button ) => {
				button.addEventListener( 'click', () => {
					const item = button.closest(
						'.genial-blocks-accordion__item'
					);
					const isOpen =
						button.getAttribute( 'aria-expanded' ) === 'true';
					if ( ! allowMultiple ) {
						accordion
							.querySelectorAll(
								'.genial-blocks-accordion__item'
							)
							.forEach( ( sibling ) => {
								if ( sibling !== item ) {
									setItemState( sibling, false );
								}
							} );
					}
					setItemState( item, ! isOpen );
				} );
			} );
	} );
