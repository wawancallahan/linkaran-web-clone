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
    fetchFoodAction,
    deleteFoodAction,
    setAlertFoodHideAction,
    setAlertFoodShowAction
} from '../../../actions/admin/food';
import { Food } from '../../../types/admin/food';
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
    item: Food,
    key: number,
    deleteFood: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.price}</td>
            <td>{props.item.rating}</td>
            <td>{props.item.foodCategory.name}</td>
            <td>{props.item.restaurant.name}</td>
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

    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchFoodList(page);
    }

    componentWillUnmount() {
        this.props.setAlertFoodHideAction();
    }

    fetchFoodList = (page: number) => {
        this.props.fetchFoodAction(page);
    }

    deleteFood = (id: number) => {
        this.props.deleteFoodAction(id)
            .then( (response: ApiResponse<Food>) => {
                this.fetchFoodList(1);

                this.props.setAlertFoodShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<Food>) => {
                this.props.setAlertFoodShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let foodList: any = <TableItemEmpty />;

        if (this.props.foodList.length > 0) {
            foodList = this.props.foodList.map((item: Food, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteFood={this.deleteFood}
                           />
            ));
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
                                            <h3 className="mb-0">Daftar Food</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/food/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Food
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
                                            <th>Harga</th>
                                            <th>Rating</th>
                                            <th>Kategori</th>
                                            <th>Restoran</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {foodList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchFoodAction} />
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
    foodList: Food[],
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

interface LinkDispatchToProps {
    fetchFoodAction: (page: number) => void,
    deleteFoodAction: (id: number) => Promise<ApiResponse<Food>>,
    setAlertFoodHideAction: () => void,
    setAlertFoodShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchFoodAction: (page: number) => dispatch(fetchFoodAction(page)),
        deleteFoodAction: (id: number) => dispatch(deleteFoodAction(id)),
        setAlertFoodHideAction: () => dispatch(setAlertFoodHideAction()),
        setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Food")
                    )
                );