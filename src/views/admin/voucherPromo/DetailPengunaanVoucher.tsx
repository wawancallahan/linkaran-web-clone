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
import { VoucherPromo, VoucherPromoUserUsed } from '../../../types/admin/voucherPromo';

import Spinner from '../../../components/Loader/Spinner'

import queryString from 'query-string';
import {
    fetchVoucherPromoUserUsedAction,
} from '../../../actions/admin/voucherPromo';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { parseDateTimeFormat } from '../../../helpers/utils';

type DetailPenggunaanVoucherProps = RouteComponentProps & {
    data: VoucherPromo | null
}

type Props = DetailPenggunaanVoucherProps & LinkStateToProps & LinkDispatchToProps

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: VoucherPromoUserUsed,
    key: number
}) => {
    return (
        <tr>
            <td>
                {props.item.user.name}
            </td>
            <td>
                {parseDateTimeFormat(props.item.transaction.dateTime)}
            </td>
            <td>
                {props.item.transaction.numberTransaction}
            </td>
        </tr>
    )
}

const TableItemEmpty = () => (
    <tr>
        <td colSpan={4}>Data Tidak Ditemukan</td> 
    </tr>
);

class DetailPenggunaanVoucher extends Component<Props, State> {

    state = {
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        if (this.props.data) {
            this.fetchVoucherPromoUserUsedList(page, this.props.data.id);
        }
    }

    fetchVoucherPromoUserUsedList = (page: number, id: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchVoucherPromoUserUsedAction(page, id).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    render () {

        let voucherPromoUserUsedList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.voucherPromoUserUsedList.length > 0) {
                voucherPromoUserUsedList = this.props.voucherPromoUserUsedList.map((item: VoucherPromoUserUsed, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               />
                ));
            } else {
                voucherPromoUserUsedList = <TableItemEmpty />;
            }
        }

        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <Row className="align-items-center">
                        <div className="col">
                            <h3 className="mb-0">Daftar Pengunaan Promo</h3>
                        </div>
                    </Row>
                </CardHeader>

                <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            <th>Digunakan Oleh</th>
                            <th>Periode Pengunaan</th>
                            <th>Transaksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voucherPromoUserUsedList}
                    </tbody>
               </Table>

               {loaderSpinner}
                
                <CardFooter className="py-4">
                    <Pagination pageCount={this.props.paginate.pageCount}
                                    currentPage={this.props.paginate.currentPage}
                                    itemCount={this.props.paginate.itemCount}
                                    itemClicked={(page: number) => {
                                        if (this.props.data) {
                                            this.fetchVoucherPromoUserUsedList(page, this.props.data.id)   
                                        }
                                    }} />
                </CardFooter>
            </Card>
        )
    }
}


interface LinkStateToProps {
    voucherPromoUserUsedList: VoucherPromoUserUsed[],
    paginate: Paginator,
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        voucherPromoUserUsedList: state.voucherPromoUserUsed.list,
        paginate: state.voucherPromoUserUsed.paginate,
    }
}

interface LinkDispatchToProps {
    fetchVoucherPromoUserUsedAction: (page: number, id: number) => Promise<Boolean>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailPenggunaanVoucherProps): LinkDispatchToProps => {
    return {
        fetchVoucherPromoUserUsedAction: (page: number, id: number) => dispatch(fetchVoucherPromoUserUsedAction(page, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPenggunaanVoucher))