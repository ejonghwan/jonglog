import React, { Fragment } from 'react'
import './button.css'

const Button = ({ value, classN}) => {
    return (
        <Fragment>
            <button className={classN}>
                {value}
            </button>
        </Fragment>
    )
}



export default Button;