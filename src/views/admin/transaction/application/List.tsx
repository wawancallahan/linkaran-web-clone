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
    Badge 
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
    setAlertApplicationShowAction
} from '../../../../actions/admin/transaction/application';
import { Application } from '../../../../types/admin/transaction/application';
import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

import { typeOfTransaction, colorStatusFormat } from '../../../../helpers/parseData';
import { amountFormat } from '../../../../helpers/number';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: Application,
    key: number
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
                <td>Rp. {props.item.totalCost}</td>
            <td>
                <Badge color={colorStatusFormat(props.item.status)}>{props.item.status}</Badge>
            </td>
            <td>
                <Link to={``} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
                <Link to={``} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => {}}>
                    <i className="fa fa-trash"></i>
                </Button>
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

    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchApplicationList(page);
    }

    componentWillUnmount() {
        this.props.setAlertApplicationHideAction();
    }

    fetchApplicationList = (page: number) => {
        this.props.fetchApplicationAction(page);
    }

    render() {

        let transactionApplication: any = <TableItemEmpty />;

        if (this.props.transactionApplication.length > 0) {
            transactionApplication = this.props.transactionApplication.map((item: Application, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           />
            ));
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
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Daftar Transaksi Link Pay</h3>
                                        </div>
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
                                        {transactionApplication}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchApplicationAction} />
                                </CardFooter>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

interface LinkStateToProps {
    transactionApplication: Application[],
    paginate: Paginator,
    transactionApplicationAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        transactionApplication: state.transactionApplication.list,
        paginate: state.transactionApplication.paginate,
        transactionApplicationAlert: state.transactionApplication.alert
    }
}

interface LinkDispatchToProps {
    fetchApplicationAction: (page: number) => void,
    setAlertApplicationHideAction: () => void,
    setAlertApplicationShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchApplicationAction: (page: number) => dispatch(fetchApplicationAction(page)),
        setAlertApplicationHideAction: () => dispatch(setAlertApplicationHideAction()),
        setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Transaksi Aplikasi")
                    )
                );