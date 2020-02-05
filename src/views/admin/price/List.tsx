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
    fetchPriceAction,
    deletePriceAction,
    setAlertPriceHideAction,
    setAlertPriceShowAction
} from '../../../actions/admin/price';
import { Price } from '../../../types/admin/price';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: Price,
    key: number,
    deletePrice: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.basePrice}</td>
            <td>{props.item.perKilometer}</td>
            <td>{props.item.minKm}</td>
            <td>
                <Link to={`/admin/price/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deletePrice(props.item.id)}>
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

        this.fetchPriceList(page);
    }

    componentWillUnmount() {
        this.props.setAlertPriceHideAction();
    }

    fetchPriceList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchPriceAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deletePrice = (id: number) => {
        this.props.deletePriceAction(id)
            .then( (response: ApiResponse<Price>) => {
                this.fetchPriceList(1);

                this.props.setAlertPriceShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<Price>) => {
                this.props.setAlertPriceShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let priceList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.priceList.length > 0) {
                priceList = this.props.priceList.map((item: Price, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deletePrice={this.deletePrice}
                               />
                ));
            } else {
                priceList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.priceAlert.color} isOpen={this.props.priceAlert.visible} toggle={() => this.props.setAlertPriceHideAction()} fade={false}>
                <div>{this.props.priceAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Price</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/price/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Price
                                            </Button>
                                        </Link>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Harga Dasar</th>
                                            <th>Harga Per KM</th>
                                            <th>Minimal Jarak Tempuh (KM)</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {priceList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchPriceAction} />
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
    priceList: Price[],
    paginate: Paginator,
    priceAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        priceList: state.price.list,
        paginate: state.price.paginate,
        priceAlert: state.price.alert
    }
}

interface LinkDispatchToProps {
    fetchPriceAction: (page: number) => Promise<Boolean>,
    deletePriceAction: (id: number) => Promise<ApiResponse<Price>>,
    setAlertPriceHideAction: () => void,
    setAlertPriceShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchPriceAction: (page: number) => dispatch(fetchPriceAction(page)),
        deletePriceAction: (id: number) => dispatch(deletePriceAction(id)),
        setAlertPriceHideAction: () => dispatch(setAlertPriceHideAction()),
        setAlertPriceShowAction: (message: string, color: string) => dispatch(setAlertPriceShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Price")
                    )
                );