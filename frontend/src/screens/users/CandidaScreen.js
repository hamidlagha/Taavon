import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import SearchBox from '../../components/SearchBox'
import CandidaList from '../../components/user/CandidaList'

function CandidaScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false)

    const [searchWord, setSearchWord] = useState('')
    const [filteredcandidas, setFilteredCandidas] = useState('')

    const userLoginInfo = useSelector(state => state.userLogin)
    const { success: successLogin, id, mobile, name, family } = userLoginInfo

    const userConfirmInfo = useSelector(state => state.userConfirm)
    const { candidas } = userConfirmInfo

    const onSearchChange = (e) => {
        setSearchWord(e.target.value)
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

        <React.Fragment>
            <Row className='header-fix sticky-top'>
                <SearchBox searchChange={onSearchChange} />
            </Row>
            <CandidaList candidas={filteredcandidas} />
        </React.Fragment>
    )
}

export default CandidaScreen