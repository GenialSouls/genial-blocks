const activate = ( root, tabs, index, focus = true ) => {
	const next = ( index + tabs.length ) % tabs.length;
	tabs.forEach( ( tab, i ) => {
		const selected = i === next;
		tab.setAttribute( 'aria-selected', selected ? 'true' : 'false' );
		tab.tabIndex = selected ? 0 : -1;
		const panel = root.querySelector(
			`#${ tab.getAttribute( 'aria-controls' ) }`
		);
		if ( panel ) {
			panel.hidden = ! selected;
			panel.classList.toggle( 'is-active', selected );
		}
	} );
	if ( focus ) {
		tabs[ next ].focus();
	}
};
document
	.querySelectorAll( '.wp-block-genial-blocks-tabs' )
	.forEach( ( root ) => {
		const tabs = [ ...root.querySelectorAll( '[role="tab"]' ) ];
		if ( ! tabs.length ) {
			return;
		}
		const current = tabs.findIndex(
			( tab ) => tab.getAttribute( 'aria-selected' ) === 'true'
		);
		activate( root, tabs, current < 0 ? 0 : current, false );
		tabs.forEach( ( tab, index ) => {
			tab.addEventListener( 'click', () =>
				activate( root, tabs, index )
			);
			tab.addEventListener( 'keydown', ( event ) => {
				const actions = {
					ArrowRight: index + 1,
					ArrowLeft: index - 1,
					Home: 0,
					End: tabs.length - 1,
				};
				if (
					Object.prototype.hasOwnProperty.call( actions, event.key )
				) {
					event.preventDefault();
					activate( root, tabs, actions[ event.key ] );
				}
			} );
		} );
	} );
