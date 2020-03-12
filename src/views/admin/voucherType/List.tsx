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
    fetchVoucherTypeAction,
    deleteVoucherTypeAction,
    setAlertVoucherTypeHideAction,
    setAlertVoucherTypeShowAction
} from '../../../actions/admin/voucherType';
import { VoucherType } from '../../../types/admin/voucherType';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: VoucherType,
    key: number,
    deleteVoucherType: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/voucher-type/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteVoucherType(props.item.id)}>
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

        this.fetchVoucherTypeList(page);
    }

    componentWillUnmount() {
        this.props.setAlertVoucherTypeHideAction();
    }

    fetchVoucherTypeList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchVoucherTypeAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteVoucherType = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteVoucherTypeAction(id)
                .then( (response: ApiResponse<VoucherType>) => {
                    this.fetchVoucherTypeList(1);

                    this.props.setAlertVoucherTypeShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<VoucherType>) => {
                    this.props.setAlertVoucherTypeShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let voucherTypeList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.voucherTypeList.length > 0) {
                voucherTypeList = this.props.voucherTypeList.map((item: VoucherType, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteVoucherType={this.deleteVoucherType}
                               />
                ));
            } else {
                voucherTypeList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.voucherTypeAlert.color} isOpen={this.props.voucherTypeAlert.visible} toggle={() => this.props.setAlertVoucherTypeHideAction()} fade={false}>
                <div>{this.props.voucherTypeAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Voucher Type</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/voucher-type/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Voucher Type
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
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {voucherTypeList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchVoucherTypeAction} />
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
    voucherTypeList: VoucherType[],
    paginate: Paginator,
    voucherTypeAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        voucherTypeList: state.voucherType.list,
        paginate: state.voucherType.paginate,
        voucherTypeAlert: state.voucherType.alert
    }
}

interface LinkDispatchToProps {
    fetchVoucherTypeAction: (page: number) => Promise<Boolean>,
    deleteVoucherTypeAction: (id: number) => Promise<ApiResponse<VoucherType>>,
    setAlertVoucherTypeHideAction: () => void,
    setAlertVoucherTypeShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchVoucherTypeAction: (page: number) => dispatch(fetchVoucherTypeAction(page)),
        deleteVoucherTypeAction: (id: number) => dispatch(deleteVoucherTypeAction(id)),
        setAlertVoucherTypeHideAction: () => dispatch(setAlertVoucherTypeHideAction()),
        setAlertVoucherTypeShowAction: (message: string, color: string) => dispatch(setAlertVoucherTypeShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Voucher Type")
                    )
                );