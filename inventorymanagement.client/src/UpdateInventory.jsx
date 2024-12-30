import React, { useState } from 'react';
import axios from 'axios';

const UpdateInventory = () => {
    const [inventory, setInventory] = useState({
        articleId: '', // Assuming that articleId is required to identify the inventory to update
        paymentStatus: false,
        paymentAmount: 0,
        isFixed: false
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
            await axios.post('https://localhost:7209/Inventory/Update', inventory);
            alert('Inventory updated successfully!');
        } catch (error) {
            console.error('There was an error updating the inventory!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="articleId" value={inventory.articleId} onChange={handleChange} placeholder="Article ID" />
            <input name="paymentStatus" type="checkbox" checked={inventory.paymentStatus} onChange={handleChange} />
            <label>Payment Status</label>
            <input name="paymentAmount" value={inventory.paymentAmount} onChange={handleChange} placeholder="Payment Amount" />
            <input name="isFixed" type="checkbox" checked={inventory.isFixed} onChange={handleChange} />
            <label>Is Fixed</label>
            <button type="submit">Update Inventory</button>
        </form>
    );
};

export default UpdateInventory;
