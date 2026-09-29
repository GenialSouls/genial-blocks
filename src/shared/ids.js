export function getStableId( value, fallback ) {
	const normalized = String( value || fallback )
		.toLowerCase()
		.replace( /[^a-z0-9_-]/g, '-' )
		.replace( /^-+|-+$/g, '' );

	return normalized || fallback;
}
