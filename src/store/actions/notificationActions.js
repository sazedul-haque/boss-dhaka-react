import { GET_NOTIFICATION_NO, GET_LOGS, GET_LOG_BY_CUSTOMER } from '../types';

export const getNotificationNo = (data) => {
    return {
        type: GET_NOTIFICATION_NO,
        payload: data
    }
}

export const getLogs = (data) => {
    return {
        type: GET_LOGS,
        payload: data
    }
}

export const getLogByCustomer = (data) => {
    return {
        type: GET_LOG_BY_CUSTOMER,
        payload: data
    }
}