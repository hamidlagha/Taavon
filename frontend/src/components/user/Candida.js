import React, { useState } from 'react'
import { Col } from 'react-bootstrap'

import '../../assets/css/card.css'
function Candida({ id, name, family, desc, image, selector, selections }) {
    const selected = selections.includes(id)
    return (
        <Col sm={12} md={4} lg={3} xl={3}>
            <div className={selected ? "card-green" : "card"} key={selections[0]}>
                <img className="card-img-top" src={image} />
                <div className="card-block">
                    <h6 className="card-title mt-3">{name} {family}</h6>
                    <div className="card-text">
                        {desc}
                    </div>
                </div>
                <div className="card-footer">
                    {/* <small>وضعیت شغلی</small> */}
                    {!selected ?
                        <button
                            className="btn btn-secondary float-right btn-sm"
                            onClick={() => selector(id)}
                        >رای بدهید</button>
                        :
                        <button
                            className="btn btn-danger float-right btn-sm"
                            onClick={() => selector(id)}
                        >پس گرفتن رای</button>  
                                        }
                </div> 
            </div>
        </Col>
    )
}

export default Candida