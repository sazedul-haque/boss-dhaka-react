import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getNotificationNo } from '../store/actions/notificationActions';
import axios from '../utils/axios';

import Loader from './Loader';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            gender: '',
            errors: [],
            requestPending: false
        }
    }

    componentDidMount() {
        if (this.props.id) {
            axios.get(`/auth/customers/${this.props.id}/`)
                .then(res => {
                    const customer = res.data.data;
                    this.setState({
                        name: customer.name,
                        email: customer.email,
                        phone: customer.phone,
                        gender: customer.gender
                    })
                })
                .catch(err => console.log(err))
        }
    }

    handleChange = (e) => {
        const errors = this.state.errors;
        errors[e.target.name] = '';
        this.setState({
            [e.target.name]: e.target.value,
            errors
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.name) {
            const name = 'Please enter name';
            this.setState({
                errors: { ...this.setState.errors, name }
            })
        } else if (!this.state.email) {
            const email = 'Please enter email';
            this.setState({
                errors: { ...this.setState.errors, email }
            })
        } else if (!this.state.phone) {
            const phone = 'Please enter phone';
            this.setState({
                errors: { ...this.setState.errors, phone }
            })
        } else if (!this.state.gender) {
            const gender = 'Please enter gender';
            this.setState({
                errors: { ...this.setState.errors, gender }
            })
        } else {
            const formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('phone', this.state.phone);
            formData.append('gender', this.state.gender);

            if (this.props.id) {
                this.setState({
                    requestPending: true
                })
                axios.put(`/auth/customers/${this.props.id}/`, formData)
                    .then(res => {
                        this.setState({
                            requestPending: false
                        })
                        axios.get('/auth/logs/unseen')
                            .then(res => {
                                this.props.getNotificationNo(res.data.data)
                                this.props.history.push('/customers');
                            })
                            .catch(err => console.log(err))
                        
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({
                            requestPending: false
                        })
                        if (err.response && err.response.status === 422) {
                            this.setState({
                                errors: err.response.data
                            })
                        }
                    })
            } else {
                this.setState({
                    requestPending: true
                })
                axios.post('/auth/customers/', formData)
                    .then(res => {
                        this.setState({
                            requestPending: false
                        })
                        axios.get('/auth/logs/unseen')
                            .then(res => {
                                this.props.getNotificationNo(res.data.data)
                                this.props.history.push('/customers');
                            })
                            .catch(err => console.log(err))
                    })
                    .catch(err => {
                        this.setState({ 
                            requestPending: false
                        })
                        if (err.response && err.response.status === 422) {
                            this.setState({
                                errors: err.response.data
                            })
                        }
                    })
            }
        }

    }

    render() {
        const { name, email, phone, gender, errors, requestPending } = this.state;
        return (
            <div className="dashboard-item">
                <form onSubmit={this.handleSubmit} multipart="urlencoded">
                    <div className="form-group text-left">
                        <label>Name *</label>
                        <input onChange={this.handleChange} type="text" name="name" value={name} className="form-control" />
                        <div className="error-message">{errors.name}</div>
                    </div>
                    <div className="form-group text-left">
                        <label>Email *</label>
                        <input onChange={this.handleChange} type="email" name="email" value={email} className="form-control" />
                        <div className="error-message">{errors.email}</div>
                    </div>
                    <div className="form-group text-left">
                        <label>Phone Number *</label>
                        <input onChange={this.handleChange} type="number" name="phone" value={phone} className="form-control" />
                        <div className="error-message">{errors.phone}</div>
                    </div>
                    <div className="form-group text-left">
                        <label>Gender *</label>
                        <select onChange={this.handleChange} name="gender" value={gender} className="form-control">
                            <option>Select</option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                        <div className="error-message">{errors.gender}</div>
                    </div>
                    <div className="text-right">
                        <Link to="customers" className="btn btn-secondary mr-2">Cancel</Link>
                        <button className="btn btn-primary">
                            {
                                requestPending ? <Loader color="light" height="20px" width="51px" /> : 'Submit'
                            }
                        </button>
                    </div>
                </form>
            </div>

        )
    }
}

const mapDispatchToProps = {
    getNotificationNo
}

export default connect(null, mapDispatchToProps)(CustomerForm);