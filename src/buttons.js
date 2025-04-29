import { registerBlockType } from '@wordpress/blocks';
import edit from '../blocks/buttons/edit';
import save from '../blocks/buttons/save';
import '../blocks/buttons/style.scss';

registerBlockType('amjl/buttons', {
    edit,
    save,
});