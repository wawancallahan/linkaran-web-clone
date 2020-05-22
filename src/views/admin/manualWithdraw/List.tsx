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
    fetchManualWithDrawAction,
    setAlertManualWithDrawHideAction,
    setAlertManualWithDrawShowAction,
    deleteManualWithDrawAction,
    clearFilterAction
} from '../../../actions/admin/manualWithdraw';
import { ManualWithDrawList, ManualWithDraw } from '../../../types/admin/manualWithdraw';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import swal from 'sweetalert'
import Filter from './Filter'
import Spinner from '../../../components/Loader/Spinner';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: ManualWithDrawList,
    key: number,
    deleteManualWithDraw: (id: number) => void
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
                <Link to={`/admin/manual-topup/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteManualWithDraw(props.item.id)}>
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
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchManualWithDrawList(page);
    }

    componentWillUnmount() {
        this.props.setAlertManualWithDrawHideAction();
        this.props.clearFilterManualWithDrawAction();
    }

    fetchManualWithDrawList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchManualWithDrawAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteManualWithDraw = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteManualWithDrawAction(id)
                .then( (response: ApiResponse<ManualWithDraw>) => {
                    this.fetchManualWithDrawList(1);

                    this.props.setAlertManualWithDrawShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<ManualWithDraw>) => {
                    this.props.setAlertManualWithDrawShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let manualWithdraw: any = <TableItemEmpty />;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if (this.props.manualWithdraw.length > 0) {
            manualWithdraw = this.props.manualWithdraw.map((item: ManualWithDrawList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteManualWithDraw={this.deleteManualWithDraw}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.manualWithdrawAlert.color} isOpen={this.props.manualWithdrawAlert.visible} toggle={() => this.props.setAlertManualWithDrawHideAction()} fade={false}>
                <div>{this.props.manualWithdrawAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Manual Penarikan</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/manual-topup/create">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Manual Penarikan
                                                </Button>
                                            </Link>
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
                                            <th>Bank Tujuan</th>
                                            <th>Manual</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {manualWithdraw}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchManualWithDrawList(page)
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
    manualWithdraw: ManualWithDrawList[],
    paginate: Paginator,
    manualWithdrawAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        manualWithdraw: state.manualWithdraw.list,
        paginate: state.manualWithdraw.paginate,
        manualWithdrawAlert: state.manualWithdraw.alert
    }
}

type LinkDispatchToProps = {
    fetchManualWithDrawAction: (page: number) => Promise<Boolean>,
    setAlertManualWithDrawHideAction: () => void,
    setAlertManualWithDrawShowAction: (message: string, color: string) => void,
    deleteManualWithDrawAction: (id: number) => Promise<ApiResponse<ManualWithDraw>>,
    clearFilterManualWithDrawAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchManualWithDrawAction: (page: number) => dispatch(fetchManualWithDrawAction(page)),
        setAlertManualWithDrawHideAction: () => dispatch(setAlertManualWithDrawHideAction()),
        setAlertManualWithDrawShowAction: (message: string, color: string) => dispatch(setAlertManualWithDrawShowAction(message, color)),
        deleteManualWithDrawAction: (id: number) => dispatch(deleteManualWithDrawAction(id)),
        clearFilterManualWithDrawAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Manual Penarikan")
                    )
                );