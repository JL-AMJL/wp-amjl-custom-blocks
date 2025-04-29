import { registerBlockType } from '@wordpress/blocks';
import edit from '../blocks/button/edit';
import save from '../blocks/button/save';
import '../blocks/button/style.scss';

registerBlockType('amjl/button', {
    edit,
    save,
});