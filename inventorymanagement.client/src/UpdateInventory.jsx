import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UpdateInventory = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const articleId = queryParams.get('articleId');

    const [inventory, setInventory] = useState({
        articleId: articleId || '', // Set initial state with articleId if available
        paymentStatus: false,
        paymentAmount: 0,
        isFixed: false
    });

    useEffect(() => {
        if (articleId) {
            setInventory(prevState => ({
                ...prevState,
                articleId: articleId
            }));
        }
    }, [articleId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInventory({
            ...inventory,
            [name]: type === 'checkbox' ? checked : value
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
        <form onSubmit={handleSubmit} style={formStyle}>
            <input
                name="articleId"
                value={inventory.articleId}
                onChange={handleChange}
                placeholder="Article ID"
                style={inputStyle}
            />
            <div style={sliderContainerStyle}>
                <label>Payment Status</label>
                <label className="switch">
                    <input
                        name="paymentStatus"
                        type="checkbox"
                        checked={inventory.paymentStatus}
                        onChange={handleChange}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            <input
                name="paymentAmount"
                value={inventory.paymentAmount}
                onChange={handleChange}
                placeholder="Payment Amount"
                style={inputStyle}
            />
            <div style={sliderContainerStyle}>
                <label>Is Fixed</label>
                <label className="switch">
                    <input
                        name="isFixed"
                        type="checkbox"
                        checked={inventory.isFixed}
                        onChange={handleChange}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
            <button type="submit" style={buttonStyle}>Update Inventory</button>
        </form>
    );
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem'
};

const inputStyle = {
    width: '80%',
    padding: '0.75rem',
    margin: '0.5rem 0',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.25rem'
};

const buttonStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '0.25rem'
};

const sliderContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    margin: '0.5rem 0'
};

export default UpdateInventory;
