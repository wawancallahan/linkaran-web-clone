import React, { Component } from 'react';
import withTitle from '../../../hoc/WithTitle';

import HeaderView from "../../../components/Headers/HeaderView";
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
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchWithDrawAction,
    setAlertWithDrawHideAction,
    setAlertWithDrawShowAction
} from '../../../actions/financialManager/withdraw';
import { WithDrawList } from '../../../types/financialManager/withdraw';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    needApprove: number
}

const TableItem = (props: {
    index: number,
    item: WithDrawList,
    key: number
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.name : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.phoneNumber : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.email : ''}</td>
            <td>{props.item.request && props.item.request.bankName}/{props.item.request && props.item.request.accountNumber}</td>
            <td>{props.item.request && props.item.request.accountName}</td>
            <td>{props.item.request && props.item.request.bank ? props.item.request.bank.accountName : ''}</td>
            <td>{props.item.isManual ? "Ya" : "Tidak"}</td>
            <td>
                <Link to={`/admin/withdraw/${props.item.id}`} className="btn btn-info btn-sm">
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
        needApprove: 1
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchWithDrawList(page);
    }

    componentWillUnmount() {
        this.props.setAlertWithDrawHideAction();
    }

    fetchWithDrawList = (page: number) => {
        this.props.fetchWithDrawAction(page, this.state.needApprove);
    }

    render() {

        let withdraw: any = <TableItemEmpty />;

        if (this.props.withdraw.length > 0) {
            withdraw = this.props.withdraw.map((item: WithDrawList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.withdrawAlert.color} isOpen={this.props.withdrawAlert.visible} toggle={() => this.props.setAlertWithDrawHideAction()} fade={false}>
                <div>{this.props.withdrawAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar WithDraw</h3>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>No. Telepon</th>
                                            <th>Email</th>
                                            <th>Bank/Akun</th>
                                            <th>Nama Akun</th>
                                            <th>Bank Tujuan</th>
                                            <th>Manual</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {withdraw}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.props.fetchWithDrawAction(page, this.state.needApprove)
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

interface LinkStateToProps {
    withdraw: WithDrawList[],
    paginate: Paginator,
    withdrawAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        withdraw: state.withdraw.list,
        paginate: state.withdraw.paginate,
        withdrawAlert: state.withdraw.alert
    }
}

interface LinkDispatchToProps {
    fetchWithDrawAction: (page: number, needApprove: number) => void,
    setAlertWithDrawHideAction: () => void,
    setAlertWithDrawShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchWithDrawAction: (page: number, needApprove: number) => dispatch(fetchWithDrawAction(page, needApprove)),
        setAlertWithDrawHideAction: () => dispatch(setAlertWithDrawHideAction()),
        setAlertWithDrawShowAction: (message: string, color: string) => dispatch(setAlertWithDrawShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar With Draw")
                    )
                );