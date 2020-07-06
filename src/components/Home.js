import React from 'react';
import CustomerList from './CustomerList';

const Home = (props) => {
    return (
        <div className="dashboard">
            <div>
                <CustomerList />
            </div>
        </div>
    )
}
export default Home;