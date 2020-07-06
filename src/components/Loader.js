import React from 'react';
import { ReactComponent as SpinnerLight } from '../spinning.svg';
import { ReactComponent as SpinnerDark } from '../spinning-dark.svg';

const Loader = (props) => {
    if(props.color === 'dark') {
        return <SpinnerDark height={props.height} width={props.width} />
    } else {
        return <SpinnerLight height={props.height} width={props.width} />
    }
}
export default Loader;