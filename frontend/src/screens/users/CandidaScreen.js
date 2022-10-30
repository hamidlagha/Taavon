import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Badge, Button } from 'react-bootstrap'
import SearchBox from '../../components/SearchBox'
import CandidaList from '../../components/user/CandidaList'
import { selectionSetAction } from '../../actions/actions'

function CandidaScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false)
    const selectionInfo = useSelector(state => state.selectionList)
    const { selection } = selectionInfo
    const [update, setUpdate] = useState(false)

    const [searchWord, setSearchWord] = useState('')
    const [filteredcandidas, setFilteredCandidas] = useState('')

    const userLoginInfo = useSelector(state => state.userLogin)
    const { success: successLogin, id, mobile, name, family } = userLoginInfo

    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { candidas } = userConfirmInfo

    const onSearchChange = (e) => {
        setSearchWord(e.target.value)
    }

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

    useEffect(() => {
        if (!successLogin || !id || !mobile || !candidas) {
            console.log('redirecting to /')
            navigate('/')
        }

        if (candidas && candidas.length) {
            setFilteredCandidas(candidas.filter(candida => {
                return (candida.family.includes(searchWord) || candida.name.includes(searchWord))
            }))
        }
    }, [searchWord])

    return (
        <div className='container'>
            <Row className='header-fix sticky-top'>
                <Col sm={3} md={3} lg={3} xl={3} className='d-flex align-items-center myshadow'>
                    <SearchBox searchChange={onSearchChange} />
                    <h4>
                        <Badge bg='secondary m-3 myshadow'>
                            <span className='m-1'>
                            {candidas ? candidas.length : null} / {filteredcandidas ? filteredcandidas.length : null}
                            </span>
                        </Badge>
                    </h4>
                </Col>
                <Col>
                </Col>
                <Col sm={8} md={8} lg={8} xl={8} className='d-flex justify-content-sm-between align-items-center myshadow'>
                    <span>
                        {candidas && candidas.length && candidas.map(candida => {
                            return (
                                <span key={candida.id}>
                                    {selection.includes(candida.id) ?
                                        <span className='tag tag--pill m-1' key={candida.id}>
                                            <span className='text-color-2 mx-1 text-danger' onClick={() => { selector(candida.id) }}>
                                                <i className='fas fa-times'></i>
                                            </span>
                                            <span className='mx-1'>
                                                {candida.name} {candida.family}
                                            </span>
                                        </span>
                                        : null}
                                </span>)
                        })}
                    </span>
                    <span>
                        {selection && selection.length ?
                            <Button
                                className='btn btn-success'
                                disabled={!selection.length}
                                onClick={() => navigate('/submit/')}
                            >
                                <i className='fas fa-save m-2'></i>
                                ثبت
                            </Button>
                            : null}
                    </span>
                </Col>
            </Row>
            <Row className='m-3'>

            </Row>
            <CandidaList candidas={filteredcandidas} />
        </div>
    )
}

export default CandidaScreen