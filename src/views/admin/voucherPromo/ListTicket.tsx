import React, { Component } from 'react'

import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Table,
    CardFooter,
    Button
} from 'reactstrap'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import Pagination from '../../../components/Pagination/Pagination'
import { VoucherPromo } from '../../../types/admin/voucherPromo';

type ListTicketProps = {
    data: VoucherPromo | null
}

type Props = ListTicketProps

class ListTicket extends Component<Props> {

    render () {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Daftar Tiket</h3>
                        </div>
                        <div className="col text-right">
                            <Button
                                color="primary"
                                size="sm"
                            >
                                Tambah Tiket
                            </Button>
                        </div>
                    </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>Kode</th>
                            <th>Tanggal Digunakan</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RIDE021234553ASDF</td>
                            <td>01 Jan 2020 15:00</td>
                            <td>
                                <Link to={``} className="btn btn-warning btn-sm">
                                    <i className="fa fa-edit"></i>
                                </Link>
                                <Button color="danger" size="sm">
                                    <i className="fa fa-trash"></i>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
               </Table>
                
                <CardFooter className="py-4">
                    <Pagination pageCount={0}
                                    currentPage={0}
                                    itemCount={0}
                                    itemClicked={() => {}} />
                </CardFooter>
            </Card>
        )
    }
}

interface LinkStateToProps {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
    }
}

interface LinkDispatchToProps {
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListTicketProps): LinkDispatchToProps => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTicket)