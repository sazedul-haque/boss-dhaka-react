import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCustomerList } from '../store/actions/customerActions';
import Pagination from './Pagination';
import axios from '../utils/axios';

import { ErrorOutline, Error } from '@material-ui/icons';
import Loader from './Loader';

class CustomerList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            page: null,
            deleteModal: false,
            pagePending: false,
            pageError: null,
            requestPending: false,
            requestId: null,
        }
    }

    componentDidMount() {
        this.setState({
            pagePending: true
        })
        axios.get('/auth/customers/')
            .then(res => {
                this.props.getCustomerList(res.data);
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

    deleteProduct = () => {
        this.setState({
            requestPending: true
        })
        axios.delete(`/auth/customers/${this.state.id}/`)
            .then(res => {
                axios.get(`/auth/customers`)
                    .then(res => {
                        this.props.getCustomerList(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                this.setState({
                    deleteModal: false,
                    id: null,
                    requestPending: false
                })
            })
            .catch(err => {
                this.setState({
                    requestPending: false
                })
            })
    }

    pageChange = (page) => {
        if (page) {
            axios.get(`/auth/customers?page=${page}`)
                .then(res => {
                    this.props.getCustomerList(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        const { customers } = this.props;
        const { id, requestPending, requestId, pagePending, pageError } = this.state;

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

        return customers && (
            <div className="dashboard">
                <div className="dashboard-item">
                    <h3 className="dashboard-title mb-4">Customer List <Link to="/add-customer" className="btn btn-secondary float-right">Add New</Link></h3>
                    <div className="table-responsive">
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th colSpan="2">Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customers.data.map(customer =>
                                        <tr key={customer._id}>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone}</td>
                                            <td>{customer.gender}</td>
                                            <td className="text-right">
                                                <Link to={'/edit-customer?' + customer._id} className="btn btn-secondary mr-2">Edit</Link>
                                                <button
                                                    onClick={() => { this.setState({ deleteModal: true, id: customer._id }) }}
                                                    className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <div className="offset-md-6 col-sm-6">
                            {
                                customers.pages > 1 &&
                                <Pagination
                                    previous={customers.previous}
                                    next={customers.next}
                                    total_page={customers.pages}
                                    current_page={customers.currentPage}
                                    pageChange={this.pageChange}
                                 />
                            }
                        </div>
                    </div>
                </div>
                {
                    this.state.deleteModal &&
                    <div className="dashboard-modal delete-modal">
                        <div className="modal-inner">
                            <div className="error-icon"><ErrorOutline /></div>
                            <p>Are you sure to delete this?</p>
                            <div>
                                <button onClick={() => { this.setState({ deleteModal: false, id: '', page: null }) }} className="btn btn-secondary mr-2">Cancel</button>
                                <button onClick={this.deleteProduct} className="btn btn-danger">
                                    {
                                        requestPending ? <Loader color="light" height="20px" width="77px" /> : 'Yes Delete'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customer.customer_list
    }
}

const mapDispatchToProps = {
    getCustomerList
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);