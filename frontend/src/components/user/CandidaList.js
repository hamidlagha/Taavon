import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Candida from './Candida'

function CandidaList({ candidas }) {

    const [selections, setSelections] = useState([])
    const [update, setUpdate] = useState(false)
    const selector = (id) => {
        if (selections.includes(id)) {
            console.log('removing')
            let array = selections
            let index = array.indexOf(id)
            if (index > -1) {
                array.splice(index, 1)
            }
            setSelections(array)
            setUpdate(!update)
        } else if (selections.length >= 4) {
            alert('full')
        } else {
            let joined = selections.concat(id)
            setSelections(joined)
        }
    }

    return (
        <React.Fragment>
            <Row className='d-inline'>
                {candidas && candidas.length && candidas.map(candida => {
                    return (
                        <span>
                            {selections.includes(candida.id) ?
                                <span className='tag tag--pill m-1' key={candida.id}>
                                    <span className='text-color-2 mx-2 text-danger' onClick={() => {selector(candida.id)}}>
                                        x
                                    </span>                                    
                                    {candida.name}
                                </span>
                                : null}
                        </span>)
                })}
            </Row>
            <div className="container">
                <Row>
                    {candidas && candidas.map((candida, i) => {
                        return (
                            <Candida
                                key={i}
                                id={candida.id}
                                name={candida.name}
                                family={candida.family}
                                desc={candida.desc}
                                image={candida.image}
                                selector={selector}
                                selections={selections}
                            />)
                    })}
                </Row>
            </div>
        </React.Fragment>
    )
}

export default CandidaList