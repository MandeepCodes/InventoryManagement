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
                </tr>
            </thead>
            <tbody>
                {inventory.map(item =>
                    <tr key={item.clientName}>
                        <td>{item.clientName}</td>
                        <td>{new Date(item.inTime).toLocaleString()}</td>
                        <td>{new Date(item.outTime).toLocaleString()}</td>
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
