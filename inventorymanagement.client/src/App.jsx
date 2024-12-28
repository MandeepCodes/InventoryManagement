import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [inventory, setInventory] = useState();

    useEffect(() => {
        fetchInventoryData();
    }, []);

    const contents = inventory === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Client Name</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Payment Status</th>
                    <th>Payment Amount</th>
                    <th>Article Type</th>
                    <th>Article Model</th>
                    <th>Refixed</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item, index) =>
                    <tr key={index}>
                        <td>{item.clientName}</td>
                        <td>{new Date(item.inTime).toLocaleString()}</td>
                        <td>{new Date(item.outTime).toLocaleString()}</td>
                        <td>{item.paymentStatus ? "Paid" : "Unpaid"}</td>
                        <td>{item.paymentAmount}</td>
                        <td>{item.articleType}</td>
                        <td>{item.articleModel}</td>
                        <td>{item.refixed ? "Yes" : "No"}</td>
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

export default App;
