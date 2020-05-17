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
    fetchServicePriceAction,
    deleteServicePriceAction,
    setAlertServicePriceHideAction,
    setAlertServicePriceShowAction,
    clearFilterAction
} from '../../../actions/admin/servicePrice';
import { ServicePrice, ServicePriceList } from '../../../types/admin/servicePrice';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import Filter from './Filter'
import NumberFormat from 'react-number-format';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: ServicePriceList,
    key: number,
    deleteServicePrice: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.basePrice} /></td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.pricePerKm} /></td>
            <td>{props.item.minKm}</td>
            <td>{props.item.district ? props.item.district.name : ''}</td>
            <td>{props.item.service ? props.item.service.name : ''}</td>
            <td>{props.item.vehicleType ? props.item.vehicleType.name : ''}</td>
            <td>
                <Link to={`/admin/service-price/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteServicePrice(props.item.id)}>
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

        this.fetchServicePriceList(page);
    }

    componentWillUnmount() {
        this.props.setAlertServicePriceHideAction();
        this.props.clearFilterServicePriceAction();
    }

    fetchServicePriceList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchServicePriceAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteServicePrice = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteServicePriceAction(id)
                .then( (response: ApiResponse<ServicePrice>) => {
                    this.fetchServicePriceList(1);

                    this.props.setAlertServicePriceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<ServicePrice>) => {
                    this.props.setAlertServicePriceShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {
        let servicePriceList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.servicePriceList.length > 0) {
                servicePriceList = this.props.servicePriceList.map((item: ServicePriceList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteServicePrice={this.deleteServicePrice}
                               />
                ));
            } else {
                servicePriceList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.servicePriceAlert.color} isOpen={this.props.servicePriceAlert.visible} toggle={() => this.props.setAlertServicePriceHideAction()} fade={false}>
                <div>{this.props.servicePriceAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Harga Layanan</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/service-price/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Harga Layanan
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
                                            <th>Harga Dasar</th>
                                            <th>Harga Per KM</th>
                                            <th>Minimal Jarak Tempuh (KM)</th>
                                            <th>Wilayah</th>
                                            <th>Layanan</th>
                                            <th>Jenis Kendaraan</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicePriceList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchServicePriceList(page)
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
    servicePriceList: ServicePriceList[],
    paginate: Paginator,
    servicePriceAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        servicePriceList: state.servicePrice.list,
        paginate: state.servicePrice.paginate,
        servicePriceAlert: state.servicePrice.alert
    }
}

interface LinkDispatchToProps {
    fetchServicePriceAction: (page: number) => Promise<Boolean>,
    deleteServicePriceAction: (id: number) => Promise<ApiResponse<ServicePrice>>,
    setAlertServicePriceHideAction: () => void,
    setAlertServicePriceShowAction: (message: string, color: string) => void,
    clearFilterServicePriceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchServicePriceAction: (page: number) => dispatch(fetchServicePriceAction(page)),
        deleteServicePriceAction: (id: number) => dispatch(deleteServicePriceAction(id)),
        setAlertServicePriceHideAction: () => dispatch(setAlertServicePriceHideAction()),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
        clearFilterServicePriceAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Harga Layanan")
                    )
                );