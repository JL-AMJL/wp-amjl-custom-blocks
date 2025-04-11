import { useBlockProps } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { Button, Modal, TextControl } from '@wordpress/components';
import iconsData from '../../scripts/output/filtered-icons.min.json'; // Import your filtered icons JSON

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');

    // Extract icons from the imported JSON
    const icons = iconsData.icons;

    // Filter icons based on the search term
    const filteredIcons = Object.keys(icons).filter((icon) => {
        const keywords = icons[icon].k; // Keywords from the JSON
        const label = icons[icon].l.toLowerCase(); // Label from the JSON
        return (
            label.includes(filter.toLowerCase()) || // Match label
            keywords.some((keyword) => keyword.includes(filter.toLowerCase())) // Match keywords
        );
    });

    return (
        <div {...blockProps}>
            <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
            >
                Select Icon
            </Button>
            {attributes.selectedIcon && (
                <div>
                    <i className={`fas fa-${attributes.selectedIcon}`}></i>
                    <p>Selected Icon: {attributes.selectedIcon}</p>
                </div>
            )}
            {isModalOpen && (
                <Modal
                    title="Select an Icon"
                    onRequestClose={() => setIsModalOpen(false)}
                >
                    <TextControl
                        label="Filter Icons"
                        value={filter}
                        onChange={(value) => setFilter(value)}
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                        {filteredIcons.map((icon) => (
                            <Button
                                key={icon}
                                onClick={() => {
                                    setAttributes({ selectedIcon: icon });
                                    setIsModalOpen(false);
                                }}
                                style={{ width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            >
                                <i className={`fas fa-${icon}`}></i>
                            </Button>
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
}