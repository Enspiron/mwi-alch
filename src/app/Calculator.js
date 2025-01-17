import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Calculator({ itemInfo, isDarkMode, itemName }) {
    return (
        <div className={`container ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'} p-4`}>
            <h1 className="mb-4">Calculator</h1>
            <div className="card">
                <div className="card-body">
                    {itemName}
                </div>
            </div>
        </div>
    );
}