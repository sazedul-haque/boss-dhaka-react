import { CUSTOMER_LIST, CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../types';


const initialState = {
    customer_list: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CUSTOMER_LIST:
            return {
                ...state,
                customer_list: action.payload
            }
        default:
            return state
    }
}