import React from 'react'

import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <React.Fragment>
            <div id="busy-holder">
                <Spinner
                    animation='border'
                    role='status'
                    className='busy'
                >
                </Spinner>
            </div>
        </React.Fragment>
    )
}

export default Loader