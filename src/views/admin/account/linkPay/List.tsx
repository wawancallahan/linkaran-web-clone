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
    Alert
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

import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchAccountLinkPayAction,
    setAlertAccountLinkPayHideAction,
    setAlertAccountLinkPayShowAction
} from '../../../../actions/admin/account/linkPay';
import { AccountLinkPay } from '../../../../types/admin/account/linkPay';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

import { typeOfTransaction } from '../../../../helpers/utils';
import { amountFormat } from '../../../../helpers/number';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: AccountLinkPay,
    key: number
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.balance}</td>
            <td>{props.item.code}</td>
            <td>{props.item.type}</td>
            <td>
                <Link to={`/admin/account/link-pay/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i> Detail
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

    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchAccountLinkPayList(page);
    }

    componentWillUnmount() {
        this.props.setAlertAccountLinkPayHideAction();
    }

    fetchAccountLinkPayList = (page: number) => {
        this.props.fetchAccountLinkPayAction(page);
    }

    render() {

        let accountLinkPay: any = <TableItemEmpty />;

        if (this.props.accountLinkPay.length > 0) {
            accountLinkPay = this.props.accountLinkPay.map((item: AccountLinkPay, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.accountLinkPayAlert.color} isOpen={this.props.accountLinkPayAlert.visible} toggle={() => this.props.setAlertAccountLinkPayHideAction()} fade={false}>
                <div>{this.props.accountLinkPayAlert.message}</div>
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
                                            <th>Nama</th>
                                            <th>Jumlah</th>
                                            <th>Kode</th>
                                            <th>Tipe</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountLinkPay}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchAccountLinkPayAction} />
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
    accountLinkPay: AccountLinkPay[],
    paginate: Paginator,
    accountLinkPayAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        accountLinkPay: state.accountLinkPay.list,
        paginate: state.accountLinkPay.paginate,
        accountLinkPayAlert: state.accountLinkPay.alert
    }
}

type LinkDispatchToProps = {
    fetchAccountLinkPayAction: (page: number) => void,
    setAlertAccountLinkPayHideAction: () => void,
    setAlertAccountLinkPayShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchAccountLinkPayAction: (page: number) => dispatch(fetchAccountLinkPayAction(page)),
        setAlertAccountLinkPayHideAction: () => dispatch(setAlertAccountLinkPayHideAction()),
        setAlertAccountLinkPayShowAction: (message: string, color: string) => dispatch(setAlertAccountLinkPayShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Transaksi Link Pay")
                    )
                );