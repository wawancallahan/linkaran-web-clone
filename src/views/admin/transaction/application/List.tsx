import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';

import HeaderView from "../../../../components/Headers/HeaderView";
import {
    Container,
    Row,
    Card,
    CardHeader,
    CardFooter,
    Button,
    Table,
    Alert,
    Badge,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Col
} from 'reactstrap';
import {
    Link,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';

import {
    connect
} from 'react-redux';
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { AxiosResponse } from 'axios';
import {
    fetchApplicationAction,
    setAlertApplicationHideAction,
    setAlertApplicationShowAction,
    clearFilterAction
} from '../../../../actions/admin/transaction/application';
import { Application } from '../../../../types/admin/transaction/application';
import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

import { typeOfTransaction, colorStatusFormat, typeTransactionFormat } from '../../../../helpers/utils';
import { amountFormat } from '../../../../helpers/number';
import NumberFormat from 'react-number-format'
import Filter from './Filter'
import Spinner from '../../../../components/Loader/Spinner';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: Application,
    key: number,
    type: string
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.date}</td>
            <td>{props.item.numberTransaction}</td>
            <td>{props.item.costumerName}</td>
            <td>{props.item.driverName}</td>
            <td>
                <Badge color="success">{props.item.service}</Badge>
            </td>
                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.totalCost} /></td>
            <td>
                <Badge color={colorStatusFormat(props.item.status)}>{props.item.status}</Badge>
            </td>
            <td>
                <Link to={`/admin/transaction/application/${props.type}/${props.item.numberTransaction}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
            </td>
        </tr>
    )
}

const TableItemEmpty = () => (
    <tr>
        <td colSpan={4}>Data Tidak Ditemukan</td> 
    </tr>
);

class List extends Component<Props, State> {

    state = {
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchApplicationList(page);
    }

    componentWillUnmount() {
        this.props.setAlertApplicationHideAction();
        this.props.clearFilterApplicationAction();
    }

    fetchApplicationList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchApplicationAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    getTypeQuery = () => {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const typeQuery = queryStringValue.type as string || undefined;

        return typeTransactionFormat(typeQuery)
    }

    render() {

        let transactionApplicationList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.transactionApplicationList.length > 0) {
                transactionApplicationList = this.props.transactionApplicationList.map((item: Application, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               type={this.getTypeQuery()}
                               />
                ));
            } else {
                transactionApplicationList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.transactionApplicationAlert.color} isOpen={this.props.transactionApplicationAlert.visible} toggle={() => this.props.setAlertApplicationHideAction()} fade={false}>
                <div>{this.props.transactionApplicationAlert.message}</div>
            </Alert>
        );

        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row>
                                        <div className="col">
                                            {CAlert}
                                        </div>
                                    </Row>
                                    <Row className="align-items-center mb-3">
                                        <div className="col">
                                            <h3 className="mb-0">Daftar Transaksi Aplikasi</h3>
                                        </div>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col>
                                            <Filter />
                                        </Col>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal & Waktu</th>
                                            <th>No Transaksi</th>
                                            <th>Pelanggan</th>
                                            <th>Driver</th>
                                            <th>Layanan</th>
                                            <th>Total Transaksi</th>
                                            <th>Status</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionApplicationList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchApplicationList(page)
                                                    }} />
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

type LinkStateToProps = {
    transactionApplicationList: Application[],
    paginate: Paginator,
    transactionApplicationAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        transactionApplicationList: state.transactionApplication.list,
        paginate: state.transactionApplication.paginate,
        transactionApplicationAlert: state.transactionApplication.alert
    }
}

type LinkDispatchToProps = {
    fetchApplicationAction: (page: number) => Promise<Boolean>,
    setAlertApplicationHideAction: () => void,
    setAlertApplicationShowAction: (message: string, color: string) => void,
    clearFilterApplicationAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchApplicationAction: (page: number) => dispatch(fetchApplicationAction(page)),
        setAlertApplicationHideAction: () => dispatch(setAlertApplicationHideAction()),
        setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color)),
        clearFilterApplicationAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Transaksi Aplikasi")
                    )
                );