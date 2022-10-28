import React from 'react'
import { Col } from 'react-bootstrap'

import '../../assets/css/card.css'
function Candida({name, family, desc, image}) {
    return (
        <Col sm={12} md={4} lg={3} xl={3}>
            <div className="card">
                <img className="card-img-top" src={image} />
                <div className="card-block">
                    <h4 className="card-title mt-3">{name} {family}</h4>
                    <div className="card-text">
                        {desc}
                    </div>
                </div>
                <div className="card-footer">
                    {/* <small>وضعیت شغلی</small> */}
                    <button className="btn btn-secondary float-right btn-sm">رای بدهید</button>
                </div>
            </div>
        </Col>
    )
}

export default Candida