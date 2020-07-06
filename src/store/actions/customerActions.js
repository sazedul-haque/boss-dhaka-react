import { CUSTOMER_LIST, CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../types';

export const getCustomerList = (data) => {
    return (dispatch) => {
        dispatch({
            type: CUSTOMER_LIST,
            payload: data
        })
    }
}

export const addCustomer = (data) => {
    return (dispatch) => {
        dispatch({
            type: CREATE_CUSTOMER,
            payload: data
        })
    }
}

export const editCustomer = (data) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_CUSTOMER,
            payload: data
        })
    }
}

export const deleteCustomer = (slug) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_CUSTOMER,
            payload: slug
        })
    }
}