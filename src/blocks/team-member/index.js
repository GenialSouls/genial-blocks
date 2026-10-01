import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import { blockIcons } from '../../shared/block-icons';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
	...metadata,
	title: __( 'Team Member', 'genial-blocks' ),
	icon: blockIcons.teamMember,
	edit: Edit,
	save,
} );
