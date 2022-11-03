import React, { useEffect } from 'react'
import { reportAllZonesAction } from '../../actions/actions'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../../components/Loader'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ReportAllZonesScreen() {
    const dispatch = useDispatch();

    const { loading, success, error, zones } = useSelector(state => state.reportAllZones)

    useEffect(() => {
        if(!zones) {
            dispatch(reportAllZonesAction())
        }
    }, [])
    return (
        <div>
            {loading ?
                <Loader />
                : !success ?
                    <h1 className='text-danger'> {error}</h1>
                    : (
                        <div>
                            {zones && zones.length ?
                                <div className='container'>
                                    <h1>گزارش کلی نتایج آرا مناطق و نواحی</h1>
                                    {zones.map(zone => {
                                        return (
                                            <div className='my-5'>
                                                <Table striped bordered hover variant="dark">
                                                    <thead>
                                                        <tr>
                                                            <th>کد</th>
                                                            <th>تعداد کاندیدا</th>
                                                            <th>تعداد اعضا</th>
                                                            <th>تعداد شرکت کننده ها</th>
                                                            <th>تعداد آرا</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>{zone.zoneID}</td>
                                                            <td>{zone.candidaCount}</td>
                                                            <td>{zone.memberCount}</td>
                                                            <td>{zone.voterCount}</td>
                                                            <td>{zone.voteCount}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>

                                                <Table striped bordered hover size="sm">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>کد پرسنلی</th>
                                                            <th>نام </th>
                                                            <th>نام خانوادگی</th>
                                                            <th>تلفن</th>
                                                            <th>تعداد ارا</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {zone && zone.candidas.length ?
                                                            zone.candidas.map((candid, i) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{i + 1}</td>
                                                                        <td>
                                                                            <Link to={`/report/candida/${candid.id}`} >
                                                                                {candid.prs}
                                                                            </Link>
                                                                        </td>
                                                                        <td>{candid.name}</td>
                                                                        <td>{candid.family}</td>
                                                                        <td>{candid.phone}</td>
                                                                        <td>{candid.vote_total}</td>
                                                                    </tr>
                                                                )
                                                            })

                                                            : <tr>اشکال در تعداد کاندیداها</tr>}

                                                    </tbody>
                                                </Table>
                                                <hr></hr>
                                            </div>
                                        )
                                    })}
                                </div>
                                : <h1>NO RECORD</h1>}
                        </div>
                    )}
        </div>
    )
}

export default ReportAllZonesScreen