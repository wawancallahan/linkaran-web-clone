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
    fetchFoodCategoryAction,
    deleteFoodCategoryAction,
    setAlertFoodCategoryHideAction,
    setAlertFoodCategoryShowAction
} from '../../../actions/admin/foodCategory';
import { FoodCategory } from '../../../types/admin/foodCategory';
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
    item: FoodCategory,
    key: number,
    deleteFoodCategory: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/food-category/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteFoodCategory(props.item.id)}>
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

        this.fetchFoodCategoryList(page);
    }

    componentWillUnmount() {
        this.props.setAlertFoodCategoryHideAction();
    }

    fetchFoodCategoryList = (page: number) => {
        this.props.fetchFoodCategoryAction(page);
    }

    deleteFoodCategory = (id: number) => {
        this.props.deleteFoodCategoryAction(id)
            .then( (response: ApiResponse<FoodCategory>) => {
                this.fetchFoodCategoryList(1);

                this.props.setAlertFoodCategoryShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<FoodCategory>) => {
                this.props.setAlertFoodCategoryShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let foodCategoryList: any = <TableItemEmpty />;

        if (this.props.foodCategoryList.length > 0) {
            foodCategoryList = this.props.foodCategoryList.map((item: FoodCategory, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteFoodCategory={this.deleteFoodCategory}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.foodCategoryAlert.color} isOpen={this.props.foodCategoryAlert.visible} toggle={() => this.props.setAlertFoodCategoryHideAction()} fade={false}>
                <div>{this.props.foodCategoryAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Food Category</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/food-category/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Food Category
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
                                        {foodCategoryList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchFoodCategoryAction} />
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
    foodCategoryList: FoodCategory[],
    paginate: Paginator,
    foodCategoryAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        foodCategoryList: state.foodCategory.list,
        paginate: state.foodCategory.paginate,
        foodCategoryAlert: state.foodCategory.alert
    }
}

interface LinkDispatchToProps {
    fetchFoodCategoryAction: (page: number) => void,
    deleteFoodCategoryAction: (id: number) => Promise<ApiResponse<FoodCategory>>,
    setAlertFoodCategoryHideAction: () => void,
    setAlertFoodCategoryShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchFoodCategoryAction: (page: number) => dispatch(fetchFoodCategoryAction(page)),
        deleteFoodCategoryAction: (id: number) => dispatch(deleteFoodCategoryAction(id)),
        setAlertFoodCategoryHideAction: () => dispatch(setAlertFoodCategoryHideAction()),
        setAlertFoodCategoryShowAction: (message: string, color: string) => dispatch(setAlertFoodCategoryShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Food Category")
                    )
                );