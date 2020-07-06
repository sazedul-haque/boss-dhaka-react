import React from 'react';
import CustomerForm from './CustomerForm';

const AddCustomer = (props) => {
    return (
        <div className="dashboard">
            <h3 className="dashboard-title mb-4">Add New Customer</h3>
            <CustomerForm {...props} />
        </div>
    )
}
export default AddCustomer;