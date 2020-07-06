import React from 'react';
import { connect } from 'react-redux';
import { getLogs, getLogByCustomer, getNotificationNo } from '../store/actions/notificationActions';
import axios from '../utils/axios';

import { ErrorOutline, Error, Search } from '@material-ui/icons';
import Loader from './Loader';

class ActivityLogs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logId: null,
            pagePending: false,
            pageError: null,
            requestPending: false
        }
    }

    componentDidMount() {
        this.setState({
            pagePending: true
        })
        axios.get('/auth/customerlogs')
            .then(res => {
                this.props.getLogs(res.data.data);
                this.setState({
                    pagePending: false,
                    pageError: null
                })
            })
            .catch(err => {
                this.setState({
                    pagePending: false,
                    pageError: err.message
                })
            })
    }

    getCustomerLogs = (id) => {
        this.setState({
            logId: id
        })

        axios.get(`/auth/logs/customer/${id}/`)
            .then(res => {
                this.props.getLogByCustomer(res.data);
                axios.get('/auth/logs/unseen')
                    .then(res => this.props.getNotificationNo(res.data.data))
                    .catch(err => console.log(err))

                axios.get('/auth/customerlogs')
                    .then(res => this.props.getLogs(res.data.data))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    }

    render() {
        const { logs, customer_logs } = this.props;
        const { logId, requestPending, pagePending, pageError } = this.state;

        if (pagePending) {
            return (
                <div className="dashboard">
                    <div className="dashboard-item text-center">
                        <Loader color="dark" height="24px" width="24px" />
                        <div className="mt-3">Loading...</div>
                    </div>
                </div>
            )
        }

        if (pageError) {
            return (
                <div className="dashboard">
                    <div className="dashboard-item text-center">
                        <Error fontSize="large" />
                        <div className="mt-3">{pageError}</div>
                    </div>
                </div>
            )
        }

        return logs && (
            <div className="dashboard">
                <div className="dashboard-item">
                    <h3 className="dashboard-title">Activity Logs</h3>
                    <div id="accordion">
                        {
                            logs.map(log =>
                                <div key={log.id} className="card">
                                    <div className="card-header">
                                        <h5 onClick={this.getCustomerLogs.bind(this, log.id)} className="mb-0">
                                            <button className="btn btn-link">{log.name}</button>
                                            {
                                                log.notification > 0 && <span className="badge badge-primary badge-pill">{log.notification}</span>
                                            }

                                        </h5>
                                    </div>

                                    <div className={(logId === log.id) ? 'collapse show' : 'collapse'}>
                                        <div className="card-body">
                                            {
                                                customer_logs && (customer_logs.customerId === log.id) && customer_logs.data.map(log =>
                                                    <div key={log._id} className="alert alert-success" role="alert">
                                                        {log.metaData}
                                                        <span className="float-right">{log.createdAt}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>


                </div >
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logs: state.notification.activity_logs,
        customer_logs: state.notification.customer_logs
    }
}

const mapDispatchToProps = {
    getLogs,
    getLogByCustomer,
    getNotificationNo
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLogs);