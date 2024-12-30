import React, { useState } from 'react';
import axios from 'axios';

const AddInventory = () => {
    const [inventory, setInventory] = useState({
        clientName: '',
        articleType: '',
        articleModel: '',
        accessories: '',
        description: '',
        articleId: '0' // Default value to generate new ArticleId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventory({
            ...inventory,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7209/Inventory/Add', inventory);
            alert(`Inventory added with ArticleId: ${response.data}`);
        } catch (error) {
            console.error('There was an error adding the inventory!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="clientName" value={inventory.clientName} onChange={handleChange} placeholder="Client Name" />
            <input name="articleType" value={inventory.articleType} onChange={handleChange} placeholder="Article Type" />
            <input name="articleModel" value={inventory.articleModel} onChange={handleChange} placeholder="Article Model" />
            <input name="accessories" value={inventory.accessories} onChange={handleChange} placeholder="Accessories" />
            <input name="description" value={inventory.description} onChange={handleChange} placeholder="Description" />
            <button type="submit">Add Inventory</button>
        </form>
    );
};

export default AddInventory;
