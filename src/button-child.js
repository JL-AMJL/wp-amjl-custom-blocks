import { registerBlockType } from '@wordpress/blocks';
import { button } from '@wordpress/icons';
import edit from '../blocks/button-child/edit';
import save from '../blocks/button-child/save';
import '../blocks/button-child/style.scss';

console.log('Button block loaded!');

const coloredIcon = {
    src: () => (
        <span style={{ color: '#1e88e5', height: '24px', width: '24px' }}>
            {button}
        </span>
    ),
};

registerBlockType('amjl/button-child', {
    icon: coloredIcon,
    edit,
    save,
});