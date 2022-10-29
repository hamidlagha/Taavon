import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
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
            <Row className='header-fix sticky-top m-1'>
                <Col sm={4} md={4} lg={4} xl={4} className='d-inline'>
                    <SearchBox searchChange={onSearchChange} />
                </Col>
                <Col sm={2} md={2} lg={2} xl={2} className='d-inline'>
                    <span className='m-1'>نمایش</span>
                    <span className='m-1'>{filteredcandidas ? filteredcandidas.length : null}</span>
                    <span className='m-1'>از</span>
                    <span className='m-1'>{candidas ? candidas.length : null}</span>
                    <span className='m-1'>کاندیدا</span>
                </Col>
                <Col sm={6} md={6} lg={6} xl={6} className='d-inline '>
                    {candidas && candidas.length && candidas.map(candida => {
                        return (
                            <span key={candida.id}>
                                {selection.includes(candida.id) ?
                                    <span className='tag tag--pill m-1' key={candida.id}>
                                        <span className='text-color-2 mx-2 text-danger' onClick={() => { selector(candida.id) }}>
                                            x
                                        </span>
                                        {candida.name}
                                    </span>
                                    : null}
                            </span>)
                    })}
                    {selection && selection.length ?
                        <button
                            className='btn btn-primary'
                            disabled={!selection.length}
                            hidden={!selection.length}
                            onClick={() => navigate('/submit/')}
                            >
                            ثبت رای
                        </button>
                    : null}
                </Col>
            </Row>
            <CandidaList candidas={filteredcandidas} />
        </div>
    )
}

export default CandidaScreen