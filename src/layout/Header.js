import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getNotificationNo } from '../store/actions/notificationActions';
import { NotificationsNone, MailOutline, AccountBox } from '@material-ui/icons';
import axios from '../utils/axios';

const Header = (props) => {

    useEffect(() => {
        axios.get('/auth/logs/unseen')
            .then(res => {
                props.getNotificationNo(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <header>
            <div className="row">
                <div className="offset-md-4 col-8">
                    <ul className="menu-right">
                        <li><Link to="/logs"><NotificationsNone /> <span className="badge badge-primary badge-pill">{props.notifications && props.notifications}</span></Link></li>
                        <li><MailOutline /></li>
                        <li><AccountBox /> Admin</li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
const mapStateToProps = (state) => {
    return {
        notifications: state.notification.notification_no
    }
}
const mapDispatchToProps = {
    getNotificationNo
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);