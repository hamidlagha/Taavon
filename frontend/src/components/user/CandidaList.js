import React from 'react'
import { Row } from 'react-bootstrap'
import Candida from './Candida'

function CandidaList({ candidas }) {
    console.log(candidas)
    return (
        <div className="container">
            <Row>
                {candidas && candidas.map((candida, i) => {
                    return (
                        <Candida 
                            key={i}
                            name={candida.name} 
                            family={candida.family}
                            desc={candida.desc}
                            image={candida.image}
                        />)
                })}
            </Row>
        </div>
    )
}

export default CandidaList