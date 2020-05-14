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
    Alert,
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
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchTopUpAction,
    setAlertTopUpHideAction,
    setAlertTopUpShowAction,
    clearFilterAction
} from '../../../actions/financialManager/topup';
import { TopUpList } from '../../../types/financialManager/topup';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Filter from './Filter'
import Spinner from '../../../components/Loader/Spinner';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    needApprove: number,
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: TopUpList,
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
            <td>{props.item.request && props.item.request.uniqueCodeWithAmount}</td>
            <td>{props.item.request && props.item.request.bank ? props.item.request.bank.accountName : ''}</td>
            <td>{props.item.isManual ? "Ya" : "Tidak"}</td>
            <td>
                <Link to={`/admin/topup/${props.item.id}`} className="btn btn-info btn-sm">
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
        needApprove: 1,
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchTopUpList(page);
    }

    componentWillUnmount() {
        this.props.setAlertTopUpHideAction();
        this.props.clearFilterTopUpAction();
    }

    fetchTopUpList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchTopUpAction(page, this.state.needApprove).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    render() {

        let topup: any = <TableItemEmpty />;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if (this.props.topup.length > 0) {
            topup = this.props.topup.map((item: TopUpList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.topupAlert.color} isOpen={this.props.topupAlert.visible} toggle={() => this.props.setAlertTopUpHideAction()} fade={false}>
                <div>{this.props.topupAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar TopUp</h3>
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
                                            <th>Nama</th>
                                            <th>No. Telepon</th>
                                            <th>Email</th>
                                            <th>Bank/Akun</th>
                                            <th>Nama Akun</th>
                                            <th>Jumlah</th>
                                            <th>Bank Tujuan</th>
                                            <th>Manual</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topup}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.props.fetchTopUpAction(page, this.state.needApprove)
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
    topup: TopUpList[],
    paginate: Paginator,
    topupAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        topup: state.topup.list,
        paginate: state.topup.paginate,
        topupAlert: state.topup.alert
    }
}

interface LinkDispatchToProps {
    fetchTopUpAction: (page: number, needApprove: number) => Promise<Boolean>,
    setAlertTopUpHideAction: () => void,
    setAlertTopUpShowAction: (message: string, color: string) => void,
    clearFilterTopUpAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchTopUpAction: (page: number, needApprove: number) => dispatch(fetchTopUpAction(page, needApprove)),
        setAlertTopUpHideAction: () => dispatch(setAlertTopUpHideAction()),
        setAlertTopUpShowAction: (message: string, color: string) => dispatch(setAlertTopUpShowAction(message, color)),
        clearFilterTopUpAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Top Up")
                    )
                );