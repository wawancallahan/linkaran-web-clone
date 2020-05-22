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
    fetchFoodAction,
    deleteFoodAction,
    setAlertFoodHideAction,
    setAlertFoodShowAction,
    clearFilterAction
} from '../../../actions/admin/food';
import { Food, FoodList } from '../../../types/admin/food';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';
import Filter from './Filter'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: FoodList,
    key: number,
    deleteFood: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.price} /></td>
            <td>{props.item.rating}</td>
            <td>{props.item.foodCategory ? props.item.foodCategory.name : ''}</td>
            <td>{props.item.restaurant ? props.item.restaurant.name : ''}</td>
            <td>{props.item.restaurant && props.item.restaurant.district ? props.item.restaurant.district.name : ''}</td>
            <td>
                <Link to={`/admin/food/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteFood(props.item.id)}>
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

        this.fetchFoodList(page);
    }

    componentWillUnmount() {
        this.props.setAlertFoodHideAction();
        this.props.clearFilterFoodAction();
    }

    fetchFoodList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchFoodAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteFood = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteFoodAction(id)
                    .then( (response: ApiResponse<Food>) => {
                        this.fetchFoodList(1);

                        this.props.setAlertFoodShowAction("Data Berhasil Dihapus", 'success');
                    })
                    .catch( (response: ApiResponse<Food>) => {
                        this.props.setAlertFoodShowAction(response.error!.metaData.message, 'danger');
                    });
            }
        })
    }

    render() {

        let foodList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.foodList.length > 0) {
                foodList = this.props.foodList.map((item: FoodList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteFood={this.deleteFood}
                               />
                ));
            } else {
                foodList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.foodAlert.color} isOpen={this.props.foodAlert.visible} toggle={() => this.props.setAlertFoodHideAction()} fade={false}>
                <div>{this.props.foodAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Makanan</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/food/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Makanan
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
                                            <th>Harga</th>
                                            <th>Rating</th>
                                            <th>Kategori</th>
                                            <th>Restoran</th>
                                            <th>Kota</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foodList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchFoodList(page)
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
    foodList: FoodList[],
    paginate: Paginator,
    foodAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        foodList: state.food.list,
        paginate: state.food.paginate,
        foodAlert: state.food.alert
    }
}

type LinkDispatchToProps = {
    fetchFoodAction: (page: number) => Promise<Boolean>,
    deleteFoodAction: (id: number) => Promise<ApiResponse<Food>>,
    setAlertFoodHideAction: () => void,
    setAlertFoodShowAction: (message: string, color: string) => void,
    clearFilterFoodAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchFoodAction: (page: number) => dispatch(fetchFoodAction(page)),
        deleteFoodAction: (id: number) => dispatch(deleteFoodAction(id)),
        setAlertFoodHideAction: () => dispatch(setAlertFoodHideAction()),
        setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color)),
        clearFilterFoodAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Makanan")
                    )
                );