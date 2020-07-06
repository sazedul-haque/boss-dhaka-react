import React from 'react';
import { withRouter } from 'react-router';
import { Link } from "react-router-dom";
import { HomeOutlined, PeopleAltOutlined, HistoryOutlined } from '@material-ui/icons';

const Sidebar = (props) => {
    return (
        <div className="sidebar">
            <div className="logo">Logo</div>
            <ul className="sidebar-menu">
                <li className={(props.location.pathname === '/') ? 'active' : ''}>
                    <Link to="/"><HomeOutlined className="icon-left" /> Home</Link>
                </li>
                <li className={(props.location.pathname === '/customers') ? 'active' : ''}>
                    <Link to="/customers"><PeopleAltOutlined className="icon-left" /> Customers</Link>
                </li>
                <li className={(props.location.pathname === '/logs') ? 'active' : ''}>
                    <Link to="/logs"><HistoryOutlined className="icon-left" /> Activity Logs</Link>
                </li>
            </ul>
        </div>
    )
}
export default withRouter(Sidebar);