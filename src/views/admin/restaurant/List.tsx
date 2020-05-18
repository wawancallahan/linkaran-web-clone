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
    fetchRestaurantAction,
    deleteRestaurantAction,
    setAlertRestaurantHideAction,
    setAlertRestaurantShowAction,
    clearFilterAction
} from '../../../actions/admin/restaurant';
import { Restaurant, RestaurantList } from '../../../types/admin/restaurant';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
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
    item: RestaurantList,
    key: number,
    deleteRestaurant: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.point ? (props.item.point.lat + "," + props.item.point.lng) : ''}</td>
            <td>{props.item.rating}</td>
            <td>{props.item.address}</td>
            <td>{props.item.registered ? 'Ya' : 'Tidak'}</td>
            <td>
                <Link to={`/admin/restaurant/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteRestaurant(props.item.id)}>
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

        this.fetchRestaurantList(page);
    }

    componentWillUnmount() {
        this.props.setAlertRestaurantHideAction();
        this.props.clearFilterRestaurantAction();
    }

    fetchRestaurantList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchRestaurantAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteRestaurant = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteRestaurantAction(id)
                .then( (response: ApiResponse<Restaurant>) => {
                    this.fetchRestaurantList(1);

                    this.props.setAlertRestaurantShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Restaurant>) => {
                    this.props.setAlertRestaurantShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let restaurantList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.restaurantList.length > 0) {
                restaurantList = this.props.restaurantList.map((item: RestaurantList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteRestaurant={this.deleteRestaurant}
                               />
                ));
            } else {
                restaurantList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.restaurantAlert.color} isOpen={this.props.restaurantAlert.visible} toggle={() => this.props.setAlertRestaurantHideAction()} fade={false}>
                <div>{this.props.restaurantAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Restoran</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/restaurant/create">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Restoran
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
                                            <th>Point</th>
                                            <th>Rating</th>
                                            <th>Alamat</th>
                                            <th>Registrasi</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurantList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchRestaurantList(page)
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
    restaurantList: RestaurantList[],
    paginate: Paginator,
    restaurantAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        restaurantList: state.restaurant.list,
        paginate: state.restaurant.paginate,
        restaurantAlert: state.restaurant.alert
    }
}

interface LinkDispatchToProps {
    fetchRestaurantAction: (page: number) => Promise<Boolean>,
    deleteRestaurantAction: (id: number) => Promise<ApiResponse<Restaurant>>,
    setAlertRestaurantHideAction: () => void,
    setAlertRestaurantShowAction: (message: string, color: string) => void,
    clearFilterRestaurantAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchRestaurantAction: (page: number) => dispatch(fetchRestaurantAction(page)),
        deleteRestaurantAction: (id: number) => dispatch(deleteRestaurantAction(id)),
        setAlertRestaurantHideAction: () => dispatch(setAlertRestaurantHideAction()),
        setAlertRestaurantShowAction: (message: string, color: string) => dispatch(setAlertRestaurantShowAction(message, color)),
        clearFilterRestaurantAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Restoran")
                    )
                );