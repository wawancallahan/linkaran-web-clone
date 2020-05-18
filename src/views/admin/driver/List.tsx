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
    fetchDriverAction,
    setAlertDriverHideAction,
    setAlertDriverShowAction,
    deleteDriverAction,
    clearFilterAction
} from '../../../actions/admin/driver';
import { Driver, DriverList } from '../../../types/admin/driver';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import Filter from './Filter'
import { parseDateFormat } from '../../../helpers/utils';
import _ from 'lodash'
import { EMoneyUser } from '../../../types/admin/user';
import NumberFormat from 'react-number-format'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: DriverList,
    key: number,
    deleteDriver: (id: number) => void
}) => {

    let saldo = 0;

    if (props.item.user && props.item.user.eMoneyUser && props.item.user.eMoneyUser.length > 0) {
        saldo = _.reduce(props.item.user.eMoneyUser, (sum: number, eMoneyUser: Partial<EMoneyUser>) => {
            return sum + (eMoneyUser.balance ? eMoneyUser.balance : 0);
        }, 0);
    }
    
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user ? props.item.user.name : ''}</td>
            <td>{props.item.user ? props.item.user.phoneNumber : ''}</td>
            <td>{props.item.user ? props.item.user.email : ''}</td>
            <td>{props.item.identityNumber}</td>
            <td>{props.item.gender}</td>
            <td>{props.item.dateOfBirth}</td>
            <td>{props.item.user && props.item.user.eMoneyUser && props.item.user.eMoneyUser.length > 0 ? (<NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={saldo} />)  : '-'}</td>
            <td>{props.item.createdAt ? parseDateFormat(props.item.createdAt) : ''}</td>
            <td>
                <Link to={`/admin/driver/${props.item.id}/transaksi`} className="btn btn-success btn-sm">
                    <i className="fa fa-file"></i>
                </Link>
                <Link to={`/admin/driver/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
                <Link to={`/admin/driver/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteDriver(props.item.id)}>
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
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchDriverList(page);
    }

    componentWillUnmount() {
        this.props.setAlertDriverHideAction();
        this.props.clearFilterDriverAction();
    }

    fetchDriverList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchDriverAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteDriver = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteDriverAction(id)
                .then( (response: ApiResponse<Driver>) => {
                    this.fetchDriverList(1);

                    this.props.setAlertDriverShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Driver>) => {
                    this.props.setAlertDriverShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let driverList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.driverList.length > 0) {
                driverList = this.props.driverList.map((item: DriverList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteDriver={this.deleteDriver}
                               />
                ));
            } else {
                driverList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.driverAlert.color} isOpen={this.props.driverAlert.visible} toggle={() => this.props.setAlertDriverHideAction()} fade={false}>
                <div>{this.props.driverAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Driver</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/driver/create" className="mr-2">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Driver
                                                </Button>
                                            </Link>

                                            <Link to="/admin/driver/create-from-customer">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Driver Dari Customer
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
                                            <th>No Telepon</th>
                                            <th>Email</th>
                                            <th>KTP</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Tanggal Lahir</th>
                                            <th>Saldo</th>
                                            <th>Tanggal Didaftarkan</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {driverList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchDriverList(page)
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
    driverList: DriverList[],
    paginate: Paginator,
    driverAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        driverList: state.driver.list,
        paginate: state.driver.paginate,
        driverAlert: state.driver.alert
    }
}

interface LinkDispatchToProps {
    fetchDriverAction: (page: number) => Promise<Boolean>,
    setAlertDriverHideAction: () => void,
    setAlertDriverShowAction: (message: string, color: string) => void,
    deleteDriverAction: (id: number) => Promise<ApiResponse<Driver>>,
    clearFilterDriverAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchDriverAction: (page: number) => dispatch(fetchDriverAction(page)),
        setAlertDriverHideAction: () => dispatch(setAlertDriverHideAction()),
        setAlertDriverShowAction: (message: string, color: string) => dispatch(setAlertDriverShowAction(message, color)),
        deleteDriverAction: (id: number) => dispatch(deleteDriverAction(id)),
        clearFilterDriverAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Driver")
                    )
                );