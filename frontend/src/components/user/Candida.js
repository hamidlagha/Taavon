import React, { useState } from 'react'
import { Col, Button } from 'react-bootstrap'

import '../../assets/css/card.css'
function Candida({ id, name, family, desc, image, selector, selections }) {
    const selected = selections.includes(id)
    return (
        <Col sm={12} md={4} lg={3} xl={3}>
            <div className={selected ? "card-green" : "card"} key={selections[0]}>
                <img className="card-img-top" src={image} />
                <div className="card-block">
                    <h6 className="card-title mt-3 text-center">{name} {family}</h6>
                    <div className="card-text">
                        {desc}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    {!selected ?
                        <Button
                            className="btn btn-block btn-success"
                            onClick={() => selector(id)}
                        >
                            <i className='fas fa-thumbs-up m-2'></i>
                            رای بدهید
                            </Button>
                        :
                        <Button
                            className="btn btn-block btn-danger"
                            onClick={() => selector(id)}
                        >
                            <i className='fas fa-thumbs-down m-2'></i>
                            برگشت رای
                            </Button> 
                                        }
                </div> 
            </div>
        </Col>
    )
}

export default Candida