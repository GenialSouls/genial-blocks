import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	...metadata,
	title: __( 'Advanced Button', 'genial-blocks' ),
	edit: Edit,
	save,
} );
