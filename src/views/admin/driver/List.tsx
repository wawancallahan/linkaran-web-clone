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
    fetchDriverApiAction,
    setAlertDriverHideAction,
    setAlertDriverShowAction,
    deleteDriverAction
} from '../../../actions/admin/driver';
import { Driver } from '../../../types/admin/driver';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: Driver,
    key: number,
    deleteDriver: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user.name}</td>
            <td>{props.item.user.phoneNumber}</td>
            <td>{props.item.user.email}</td>
            <td>{props.item.identityNumber}</td>
            <td>{props.item.gender}</td>
            <td>{props.item.dateOfBirth}</td>
            <td>
                <Link to={`/admin/driver/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteDriver(props.item.id)}>
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

        this.fetchDriverList(page);
    }

    componentWillUnmount() {
        this.props.setAlertDriverHideAction();
    }

    fetchDriverList(page: number) {
        this.props.fetchDriverApiAction(page);
    }

    deleteDriver = (id: number) => {
        this.props.deleteDriverAction(id)
            .then( (response: ApiResponse<Driver>) => {
                this.fetchDriverList(1);

                this.props.setAlertDriverShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<Driver>) => {
                this.props.setAlertDriverShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let driverList: any = <TableItemEmpty />;

        if (this.props.driverList.length > 0) {
            driverList = this.props.driverList.map((item: Driver, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteDriver={this.deleteDriver}
                           />
            ));
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
                                        <Link to="/admin/driver/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Driver
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
                                            <th>No Telepon</th>
                                            <th>Email</th>
                                            <th>KTP</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Tanggal Lahir</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {driverList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchDriverApiAction} />
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
    driverList: Driver[],
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
    fetchDriverApiAction: (page: number) => void,
    setAlertDriverHideAction: () => void,
    setAlertDriverShowAction: (message: string, color: string) => void,
    deleteDriverAction: (id: number) => Promise<ApiResponse<Driver>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchDriverApiAction: (page: number) => dispatch(fetchDriverApiAction(page)),
        setAlertDriverHideAction: () => dispatch(setAlertDriverHideAction()),
        setAlertDriverShowAction: (message: string, color: string) => dispatch(setAlertDriverShowAction(message, color)),
        deleteDriverAction: (id: number) => dispatch(deleteDriverAction(id)),
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Driver")
                    )
                );