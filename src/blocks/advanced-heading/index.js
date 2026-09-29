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
	title: __( 'Advanced Heading', 'genial-blocks' ),
	icon: blockIcons.advancedHeading,
	edit: Edit,
	save,
} );
