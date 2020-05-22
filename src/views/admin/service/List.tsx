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
    fetchServiceAction,
    deleteServiceAction,
    setAlertServiceHideAction,
    setAlertServiceShowAction,
    clearFilterAction
} from '../../../actions/admin/service';
import { Service, ServiceList } from '../../../types/admin/service';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import { booleanToIndonesiaText } from '../../../helpers/utils';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import Filter from './Filter'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: ServiceList,
    key: number,
    deleteService: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.code}</td>
            <td>{booleanToIndonesiaText(props.item.canBeMultiple)}</td>
            <td>{booleanToIndonesiaText(props.item.passangerWithDriver)}</td>
            <td>{props.item.maxServiceDistanceInKm}</td>
            <td>
                <Link to={`/admin/service/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteService(props.item.id)}>
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

        this.fetchServiceList(page);
    }

    componentWillUnmount() {
        this.props.setAlertServiceHideAction();
        this.props.clearFilterServiceAction();
    }

    fetchServiceList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchServiceAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteService = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteServiceAction(id)
                .then( (response: ApiResponse<Service>) => {
                    this.fetchServiceList(1);

                    this.props.setAlertServiceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Service>) => {
                    this.props.setAlertServiceShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let serviceList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.serviceList.length > 0) {
                serviceList = this.props.serviceList.map((item: ServiceList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteService={this.deleteService}
                               />
                ));
            } else {
                serviceList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.serviceAlert.color} isOpen={this.props.serviceAlert.visible} toggle={() => this.props.setAlertServiceHideAction()} fade={false}>
                <div>{this.props.serviceAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Layanan</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/service/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Layanan
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
                                            <th>Kode</th>
                                            <th>Dapat Lebih Dari 1</th>
                                            <th>Penumpang Dengan Driver</th>
                                            <th>Jarak Maksimal (KM)</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchServiceList(page)
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
    serviceList: ServiceList[],
    paginate: Paginator,
    serviceAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        serviceList: state.service.list,
        paginate: state.service.paginate,
        serviceAlert: state.service.alert
    }
}

type LinkDispatchToProps = {
    fetchServiceAction: (page: number) => Promise<Boolean>,
    deleteServiceAction: (id: number) => Promise<ApiResponse<Service>>,
    setAlertServiceHideAction: () => void,
    setAlertServiceShowAction: (message: string, color: string) => void,
    clearFilterServiceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchServiceAction: (page: number) => dispatch(fetchServiceAction(page)),
        deleteServiceAction: (id: number) => dispatch(deleteServiceAction(id)),
        setAlertServiceHideAction: () => dispatch(setAlertServiceHideAction()),
        setAlertServiceShowAction: (message: string, color: string) => dispatch(setAlertServiceShowAction(message, color)),
        clearFilterServiceAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Layanan")
                    )
                );