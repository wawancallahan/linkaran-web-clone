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
    fetchManualTopUpAction,
    setAlertManualTopUpHideAction,
    setAlertManualTopUpShowAction,
    deleteManualTopUpAction
} from '../../../actions/admin/manualTopup';
import { ManualTopUpList, ManualTopUp } from '../../../types/admin/manualTopup';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import swal from 'sweetalert'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: ManualTopUpList,
    key: number,
    deleteManualTopUp: (id: number) => void
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
                <Link to={`/admin/manual-topup/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteManualTopUp(props.item.id)}>
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

        this.fetchManualTopUpList(page);
    }

    componentWillUnmount() {
        this.props.setAlertManualTopUpHideAction();
    }

    fetchManualTopUpList = (page: number) => {
        this.props.fetchManualTopUpAction(page);
    }

    deleteManualTopUp = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteManualTopUpAction(id)
                .then( (response: ApiResponse<ManualTopUp>) => {
                    this.fetchManualTopUpList(1);

                    this.props.setAlertManualTopUpShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<ManualTopUp>) => {
                    this.props.setAlertManualTopUpShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let manualTopup: any = <TableItemEmpty />;

        if (this.props.manualTopup.length > 0) {
            manualTopup = this.props.manualTopup.map((item: ManualTopUpList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteManualTopUp={this.deleteManualTopUp}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.manualTopupAlert.color} isOpen={this.props.manualTopupAlert.visible} toggle={() => this.props.setAlertManualTopUpHideAction()} fade={false}>
                <div>{this.props.manualTopupAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Manual Top Up</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/manual-topup/create">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Manual Top Up
                                                </Button>
                                            </Link>
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
                                            <th>Jumlah</th>
                                            <th>Bank Tujuan</th>
                                            <th>Manual</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {manualTopup}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchManualTopUpAction} />
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
    manualTopup: ManualTopUpList[],
    paginate: Paginator,
    manualTopupAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        manualTopup: state.manualTopup.list,
        paginate: state.manualTopup.paginate,
        manualTopupAlert: state.manualTopup.alert
    }
}

interface LinkDispatchToProps {
    fetchManualTopUpAction: (page: number) => void,
    setAlertManualTopUpHideAction: () => void,
    setAlertManualTopUpShowAction: (message: string, color: string) => void,
    deleteManualTopUpAction: (id: number) => Promise<ApiResponse<ManualTopUp>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchManualTopUpAction: (page: number) => dispatch(fetchManualTopUpAction(page)),
        setAlertManualTopUpHideAction: () => dispatch(setAlertManualTopUpHideAction()),
        setAlertManualTopUpShowAction: (message: string, color: string) => dispatch(setAlertManualTopUpShowAction(message, color)),
        deleteManualTopUpAction: (id: number) => dispatch(deleteManualTopUpAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Manual Top Up")
                    )
                );