import { registerBlockType } from '@wordpress/blocks';
import edit from '../blocks/swiper/edit';
import save from '../blocks/swiper/save';
import '../blocks/swiper/style-editor.scss';

registerBlockType('amjl/swiper', {
    edit,
    save,
});