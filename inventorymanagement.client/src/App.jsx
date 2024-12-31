import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import AddInventory from './AddInventory';  // Import the AddInventory component
import UpdateInventory from './UpdateInventory';  // Import the UpdateInventory component

function MainPage() {
    return (
        <div>
            <h1>Air Tech Electronics</h1>
            <p>Balvinder Singh (c).</p>
            <Link to="/add-inventory"> <button className="add-inventory-button">Add Inventory</button> </Link>
            <Link to="/inventory"> <button className="inventory-button">Go to Inventory Page</button> </Link>
            <Link to="/update-inventory"> <button className="update-inventory-button">Update Inventory</button> </Link>
        </div>
    );
}

function InventoryPage() {
    const [inventory, setInventory] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const sortedInventory = () => {
        let sortableItems = [...inventory];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredInventory = sortedInventory().filter(item => {
        return (
            item.articleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleDelete = async (articleId) => {
        const response = await fetch('https://localhost:7209/Inventory/Delete', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ArticleId: articleId })
        });
        if (response.ok) {
            setInventory(inventory.filter(item => item.articleId !== articleId));
        } else {
            console.error("Failed to delete item", response.status);
        }
    };

    const handleUpdate = (articleId) => {
        navigate(`/update-inventory?articleId=${articleId}`);
    };

    const contents = inventory.length === 0
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <>
            <input
                type="text"
                placeholder="Search by Article ID or Client Name"
                value={searchQuery}
                onChange={handleSearchChange}
                style={searchBarStyle}
            />
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th><button type="button" onClick={() => requestSort('articleId')}>ID</button></th>
                        <th><button type="button" onClick={() => requestSort('clientName')}>Client Name</button></th>
                        <th><button type="button" onClick={() => requestSort('inTime')}>In Time</button></th>
                        <th><button type="button" onClick={() => requestSort('outTime')}>Out Time</button></th>
                        <th><button type="button" onClick={() => requestSort('paymentStatus')}>Payment Status</button></th>
                        <th><button type="button" onClick={() => requestSort('paymentAmount')}>Payment Amount</button></th>
                        <th><button type="button" onClick={() => requestSort('articleType')}>Article Type</button></th>
                        <th><button type="button" onClick={() => requestSort('articleModel')}>Article Model</button></th>
                        <th><button type="button" onClick={() => requestSort('isFixed')}>Fixed</button></th>
                        <th><button type="button" onClick={() => requestSort('description')}>Details</button></th>
                        <th><button type="button" onClick={() => requestSort('accessories')}>Accessories</button></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInventory.map((item, index) =>
                        <tr key={index}>
                            <td>{item.articleId}</td>
                            <td>{item.clientName}</td>
                            <td>{new Date(item.inTime).toLocaleString()}</td>
                            <td>{new Date(item.outTime).toLocaleString()}</td>
                            <td>{item.paymentStatus ? "Paid" : "Unpaid"}</td>
                            <td>{item.paymentAmount}</td>
                            <td>{item.articleType}</td>
                            <td>{item.articleModel}</td>
                            <td>{item.isFixed ? "Yes" : "No"}</td>
                            <td>{item.description}</td>
                            <td>{item.accessories}</td>
                            <td>
                                <select className="action-dropdown" onChange={(e) => {
                                    if (e.target.value === 'delete') {
                                        handleDelete(item.articleId);
                                    } else if (e.target.value === 'update') {
                                        handleUpdate(item.articleId);
                                    }
                                    e.target.value = '';  // Reset dropdown
                                }}>
                                    <option value="">Select</option>
                                    <option value="delete">Delete</option>
                                    <option value="update">Update</option>
                                </select>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>;

    return (
        <div>
            <h1 id="tableLabel">Inventory Data</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function fetchInventoryData() {
        const response = await fetch('https://localhost:7209/Inventory/GetAll');
        if (response.ok) {
            const data = await response.json();
            setInventory(data);
        } else {
            console.error("Failed to fetch data", response.status);
        }
    }
}

const searchBarStyle = {
    width: '80%',
    padding: '0.75rem',
    margin: '1rem 0',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '0.25rem'
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/add-inventory" element={<AddInventory />} />  {/* New route for AddInventory */}
                <Route path="/update-inventory" element={<UpdateInventory />} />  {/* New route for UpdateInventory */}
            </Routes>
        </Router>
    );
}

export default App;
