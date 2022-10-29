import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { selectionSetAction } from '../../actions/actions'
import Candida from './Candida'

function CandidaList({ candidas }) {
    const dispatch = useDispatch()
    const selectionInfo = useSelector(state => state.selectionList)
    const {selection} = selectionInfo
    const [update, setUpdate] = useState(false)

    const selector = (id) => {
        if (selection.includes(id)) {
            let array = selection
            let index = array.indexOf(id)
            if (index > -1) {
                array.splice(index, 1)
            }
            dispatch(selectionSetAction(selection))
            setUpdate(!update)
        } else if (selection.length >= 4) {
            alert('بیش از چهار انتخاب نمی توانید داشته باشید')
        } else {
            let joined = selection.concat(id)
            dispatch(selectionSetAction(joined))
        }
    }

    return (
        <React.Fragment>

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
                                selections={selection}
                            />)
                    })}
                </Row>
            </div>
        </React.Fragment>
    )
}

export default CandidaList