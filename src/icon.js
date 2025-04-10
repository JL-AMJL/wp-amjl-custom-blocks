import { registerBlockType } from '@wordpress/blocks';
import edit from '../blocks/icon/edit';
import save from '../blocks/icon/save';
import '../blocks/icon/style.scss';

registerBlockType('amjl/icon', {
    edit,
    save,
});