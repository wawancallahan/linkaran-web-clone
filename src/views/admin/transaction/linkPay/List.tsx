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
    fetchLinkPayAction,
    deleteLinkPayAction,
    setAlertLinkPayHideAction,
    setAlertLinkPayShowAction
} from '../../../../actions/admin/transaction/linkPay';
import { LinkPay } from '../../../../types/admin/transaction/linkPay';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: LinkPay,
    key: number,
    deleteLinkPay: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td></td>
            <td>{props.item.name}</td>
            <td>
                <Link to={``} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteLinkPay(props.item.id)}>
                    <i className="fa fa-trash"></i> Hapus
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

        this.fetchLinkPayList(page);
    }

    componentWillUnmount() {
        this.props.setAlertLinkPayHideAction();
    }

    fetchLinkPayList = (page: number) => {
        this.props.fetchLinkPayAction(page);
    }

    deleteLinkPay = (id: number) => {
        this.props.deleteLinkPayAction(id)
            .then( (response: ApiResponse<LinkPay>) => {
                this.fetchLinkPayList(1);

                this.props.setAlertLinkPayShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<LinkPay>) => {
                this.props.setAlertLinkPayShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let transactionLinkPay: any = <TableItemEmpty />;

        if (this.props.transactionLinkPay.length > 0) {
            transactionLinkPay = this.props.transactionLinkPay.map((item: LinkPay, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteLinkPay={this.deleteLinkPay}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.transactionLinkPayAlert.color} isOpen={this.props.transactionLinkPayAlert.visible} toggle={() => this.props.setAlertLinkPayHideAction()} fade={false}>
                <div>{this.props.transactionLinkPayAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Sub Brand Vehicle</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/sub-brand-vehicle/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Sub Brand Vehicle
                                            </Button>
                                        </Link>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>User</th>
                                            <th>Nama</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionLinkPay}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchLinkPayAction} />
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
    transactionLinkPay: LinkPay[],
    paginate: Paginator,
    transactionLinkPayAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        transactionLinkPay: state.transactionLinkPay.list,
        paginate: state.transactionLinkPay.paginate,
        transactionLinkPayAlert: state.transactionLinkPay.alert
    }
}

interface LinkDispatchToProps {
    fetchLinkPayAction: (page: number) => void,
    deleteLinkPayAction: (id: number) => Promise<ApiResponse<LinkPay>>,
    setAlertLinkPayHideAction: () => void,
    setAlertLinkPayShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchLinkPayAction: (page: number) => dispatch(fetchLinkPayAction(page)),
        deleteLinkPayAction: (id: number) => dispatch(deleteLinkPayAction(id)),
        setAlertLinkPayHideAction: () => dispatch(setAlertLinkPayHideAction()),
        setAlertLinkPayShowAction: (message: string, color: string) => dispatch(setAlertLinkPayShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Transaksi Link Pay")
                    )
                );