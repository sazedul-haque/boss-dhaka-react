import { GET_NOTIFICATION_NO, GET_LOGS, GET_LOG_BY_CUSTOMER } from '../types';


const initialState = {
    notification_no: null,
    activity_logs: null,
    customer_logs: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_NO:
            return {
                ...state,
                notification_no: action.payload
            }
        case GET_LOGS:
            return {
                ...state,
                activity_logs: action.payload
            }

        case GET_LOG_BY_CUSTOMER:
            return {
                ...state,
                customer_logs: action.payload
            }
        default:
            return state
    }
}