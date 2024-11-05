import React, { Fragment } from 'react'

const Alerts = ({ prompt = '', message = '' }) => {
    return (
        <Fragment>
            <div class={`alert alert-${prompt} ${message !== "" && 'mt-3'}`} role="alert">
                {message}
            </div>
        </Fragment>
    )
}

export default Alerts
