export function getSafeRel( opensInNewTab ) {
	return opensInNewTab ? 'noopener noreferrer' : undefined;
}
