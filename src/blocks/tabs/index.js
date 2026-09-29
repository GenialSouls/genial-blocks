import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import { blockIcons } from '../../shared/block-icons';
import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, { ...metadata, icon: blockIcons.tabs, edit: Edit, save } );
