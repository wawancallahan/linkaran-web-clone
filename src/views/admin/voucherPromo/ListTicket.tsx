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

import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import Pagination from '../../../components/Pagination/Pagination'
import { VoucherPromo } from '../../../types/admin/voucherPromo';
import { Ticket } from '../../../types/admin/ticket';
import { Paginator } from '../../../types/paginator';
import { fetchTicketVoucherAction } from '../../../actions/admin/ticket';
import Spinner from '../../../components/Loader/Spinner'
import { parseDateTimeFormat } from '../../../helpers/parseData';
import queryString from 'query-string';

type ListTicketProps = RouteComponentProps & {
    data: VoucherPromo | null
}

type Props = ListTicketProps & LinkStateToProps & LinkDispatchToProps

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: Ticket,
    key: number
}) => {
    return (
        <tr>
            <td>{props.item.redeemCode}</td>
            <td>{parseDateTimeFormat(props.item.claimAt)}</td>
            <Button color="warning" size="sm">
                <i className="fa fa-edit"></i>
            </Button>
            <Button color="danger" size="sm">
                <i className="fa fa-trash"></i>
            </Button>
        </tr>
    )
}

const TableItemEmpty = () => (
    <tr>
        <td colSpan={4}>Data Tidak Ditemukan</td> 
    </tr>
);

class ListTicket extends Component<Props, State> {

    state = {
        loader: false
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        if (this.props.data) {
            this.fetchTicketVoucherList(page, this.props.data.id);
        }
    }

    fetchTicketVoucherList = (page: number, id: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchTicketVoucherAction(page, id).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    render () {

        let ticketVoucherList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.ticketVoucherList.length > 0) {
                ticketVoucherList = this.props.ticketVoucherList.map((item: Ticket, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               />
                ));
            } else {
                ticketVoucherList = <TableItemEmpty />;
            }
        }

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
                        {ticketVoucherList}
                    </tbody>
               </Table>
                
                {loaderSpinner}
                
                <CardFooter className="py-4">
                    <Pagination pageCount={this.props.paginate.pageCount}
                                    currentPage={this.props.paginate.currentPage}
                                    itemCount={this.props.paginate.itemCount}
                                    itemClicked={(page: number) => {
                                        if (this.props.data) {
                                            this.fetchTicketVoucherList(page, this.props.data.id)   
                                        }
                                    }} />
                </CardFooter>
            </Card>
        )
    }
}

interface LinkStateToProps {
    ticketVoucherList: Ticket[],
    paginate: Paginator,
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        ticketVoucherList: state.ticketVoucher.list,
        paginate: state.ticketVoucher.paginate,
    }
}

interface LinkDispatchToProps {
    fetchTicketVoucherAction: (page: number, id: number) => Promise<Boolean>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListTicketProps): LinkDispatchToProps => {
    return {
        fetchTicketVoucherAction: (page: number, id: number) => dispatch(fetchTicketVoucherAction(page, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListTicket))