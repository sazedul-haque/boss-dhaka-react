import React from 'react';
import CustomerList from './CustomerList';

const Customers = (props) => {
    return (
        <div className="dashboard">
            <div>
                <CustomerList />
            </div>
        </div>
    )
}
export default Customers;