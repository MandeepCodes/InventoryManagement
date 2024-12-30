import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import AddInventory from './AddInventory';  // Import the AddInventory component
import UpdateInventory from './UpdateInventory';  // Import the UpdateInventory component

function MainPage() {
    return (
        <div>
            <h1>Air Tech Electronics</h1>
            <p>Balvinder Singh (c).</p>
            <Link to="/inventory"> <button className="inventory-button">Go to Inventory Page</button> </Link>
            <Link to="/add-inventory"> <button className="add-inventory-button">Add Inventory</button> </Link>
            <Link to="/update-inventory"> <button className="update-inventory-button">Update Inventory</button> </Link>
        </div>
    );
}

function InventoryPage() {
    const [inventory, setInventory] = useState();

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const contents = inventory === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Payment Status</th>
                    <th>Payment Amount</th>
                    <th>Article Type</th>
                    <th>Article Model</th>
                    <th>Fixed</th>
                    <th>Details</th>
                    <th>Accessories</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item, index) =>
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
                    </tr>
                )}
            </tbody>
        </table>;

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
