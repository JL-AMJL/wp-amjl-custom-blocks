import { registerBlockType } from '@wordpress/blocks';
import { buttons } from '@wordpress/icons';
import edit from '../blocks/buttons/edit';
import save from '../blocks/buttons/save';
import '../blocks/buttons/style.scss';

console.log('Buttons block loaded!');

const coloredIcon = {
    src: ()=> (
        <span style={{ color: '#1e88e5', height: '24px', width: '24px' }}>
            {buttons}
        </span>
    ),
}

registerBlockType('amjl/buttons', {
    icon: coloredIcon,
    edit,
    save,
});