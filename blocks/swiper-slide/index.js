import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import Save from './save';
import './style.scss';

registerBlockType('amjl/swiper-slide', {
	edit: Edit,
	save: Save,
});
