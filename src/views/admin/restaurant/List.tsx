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
    fetchRestaurantAction,
    deleteRestaurantAction
} from '../../../actions/admin/restaurant';
import { Restaurant } from '../../../types/admin/restaurant';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';


type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: Restaurant,
    key: number,
    deleteRestaurant: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.point}</td>
            <td>{props.item.rating}</td>
            <td>{props.item.openTime}</td>
            <td>{props.item.closeTime}</td>
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

    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchRestaurantList(page);
    }

    fetchRestaurantList = (page: number) => {
        this.props.fetchRestaurantAction(page);
    }

    deleteRestaurant = (id: number) => {
        this.props.deleteRestaurantAction(id)
            .then( (response: ApiResponseList<Restaurant>) => {
                this.fetchRestaurantList(1);
            })
            .catch( (response: ApiResponseList<Restaurant>) => {
                console.log(
                    response.error!.metaData.message
                );
            });
    }

    render() {

        let restaurantList: any = <TableItemEmpty />;

        if (this.props.restaurantList.length > 0) {
            restaurantList = this.props.restaurantList.map((item: Restaurant, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteRestaurant={this.deleteRestaurant}
                           />
            ));
        }

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
                                        </div>
                                    </Row>
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Daftar Restaurant</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/restaurant/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Restaurant
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
                                            <th>Poin</th>
                                            <th>Rating</th>
                                            <th>Jam Buka</th>
                                            <th>Jam Tutup</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {restaurantList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchRestaurantAction} />
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
    restaurantList: Restaurant[],
    paginate: Paginator
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        restaurantList: state.restaurant.list,
        paginate: state.restaurant.paginate
    }
}

interface LinkDispatchToProps {
    fetchRestaurantAction: (page: number) => void,
    deleteRestaurantAction: (id: number) => Promise<ApiResponseList<Restaurant>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchRestaurantAction: (page: number) => dispatch(fetchRestaurantAction(page)),
        deleteRestaurantAction: (id: number) => dispatch(deleteRestaurantAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Restaurant")
                    )
                );