import { Path, SVG } from '@wordpress/primitives';

const iconPaths = {
	info: [
		'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z',
	],
	check: [ 'm9 16.17-4.17-4.17-1.42 1.41L9 19 20.59 7.41 19.17 6 9 16.17Z' ],
	star: [
		'm12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z',
	],
	lightbulb: [
		'M9 21h6v-1H9v1Zm3-19a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2Zm2.5 11.1-.5.35V15h-4v-1.55l-.5-.35A5 5 0 1 1 14.5 13.1Z',
	],
	'arrow-right': [
		'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8Z',
	],
};

export function Icon( { name, size = 24 } ) {
	const paths = iconPaths[ name ] || iconPaths.info;

	return (
		<SVG
			aria-hidden="true"
			focusable="false"
			viewBox="0 0 24 24"
			width={ size }
			height={ size }
		>
			{ paths.map( ( path ) => (
				<Path key={ path } d={ path } />
			) ) }
		</SVG>
	);
}
