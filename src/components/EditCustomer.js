import React from 'react';
import CustomerForm from './CustomerForm';
import { withRouter } from 'react-router';

const EditCustomer = (props) => {
    const id = props.location.search.replace('?', '');
    return (
        <div className="dashboard">
            <h3 className="dashboard-title mb-4">Edit Customer</h3>
            <CustomerForm id={id} {...props} />
        </div>
    )
}
export default withRouter(EditCustomer);