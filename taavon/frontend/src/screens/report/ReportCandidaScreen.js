import React, { useEffect } from 'react';
import { reportCandidaAction } from '../../actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { Table } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function ReportCandidaScreen() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, success, error, name, family, code, prs, zone, votes } = useSelector(state => state.reportCandida)

    useEffect(() => {
        if (id) {
            dispatch(reportCandidaAction(id));
        } else {
            navigate('/')
        }
    }, [id])

    function miladi_be_shamsi(gy, gm, gd) {
        var g_d_m, jy, jm, jd, gy2, days;
        g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        gy2 = (gm > 2) ? (gy + 1) : gy;
        days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
        jy = -1595 + (33 * ~~(days / 12053));
        days %= 12053;
        jy += 4 * ~~(days / 1461);
        days %= 1461;
        if (days > 365) {
            jy += ~~((days - 1) / 365);
            days = (days - 1) % 365;
        }
        if (days < 186) {
            jm = 1 + ~~(days / 31);
            jd = 1 + (days % 31);
        } else {
            jm = 7 + ~~((days - 186) / 30);
            jd = 1 + ((days - 186) % 30);
        }
        return [jy + '/' + jm + '/' + jd];
    }

    return (
        <div>
            {loading ?
                <Loader />
                : !success ?
                    <h1 className='text-danger'> {error}</h1>
                    : (
                        <div>
                            <Container>
                                <h1 className='text-center'>گزارش آرا:  {name ? name + ' ' + family : null}</h1> 
                                <Link
                                    to='/reportall/'
                                    className='m-3 btn btn-primary'
                                >بازگشت به صفحه قبل</Link>
                                {name ?
                                    <div>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>کد پرسنلی</th>
                                                    <th>نام </th>
                                                    <th>نام خانوادگی</th>
                                                    <th>کد ملی</th>
                                                    <th>ناحیه / منطقه</th>
                                                    <th>تعداد ارا</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{prs}</td>
                                                    <td>{name}</td>
                                                    <td>{family}</td>
                                                    <td>{code}</td>
                                                    <td>{zone}</td>
                                                    <td>{votes ? votes.length : 0}</td>
                                                </tr>
                                            </tbody>
                                        </Table>

                                        <Table striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>کد پرسنلی</th>
                                                    <th>منطقه / ناحیه </th>
                                                    <th>  تاریخ</th>
                                                    <th>IP</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {votes && votes.length ?
                                                    votes.map((vote, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{vote.prs}</td>
                                                                <td>{vote.zone}</td>
                                                                <td>
                                                                    {miladi_be_shamsi(
                                                                        Number(vote.created.split('-')[0]),
                                                                        Number(vote.created.split('-')[1]),
                                                                        Number(vote.created.split('-')[2].substring(0, 2))
                                                                    )}
                                                                </td>
                                                                <td>{vote.ip}</td>
                                                            </tr>
                                                        )
                                                    })

                                                    : <tr>اشکال در تعداد کاندیداها</tr>}

                                            </tbody>
                                        </Table>
                                    </div>
                                    : <h1>ERROR Loading data</h1>}
                            </Container>
                        </div>

                    )
            }
        </div>)
}

export default ReportCandidaScreen