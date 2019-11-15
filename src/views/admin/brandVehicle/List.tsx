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
    fetchBrandVehicleAction,
    deleteBrandVehicleAction,
    setAlertBrandVehicleHideAction,
    setAlertBrandVehicleShowAction
} from '../../../actions/admin/brandVehicle';
import { BrandVehicle } from '../../../types/admin/brandVehicle';
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
    item: BrandVehicle,
    key: number,
    deleteBrandVehicle: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/brand-vehicle/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteBrandVehicle(props.item.id)}>
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

        this.fetchBrandVehicleList(page);
    }

    componentWillUnmount() {
        this.props.setAlertBrandVehicleHideAction();
    }

    fetchBrandVehicleList = (page: number) => {
        this.props.fetchBrandVehicleAction(page);
    }

    deleteBrandVehicle = (id: number) => {
        this.props.deleteBrandVehicleAction(id)
            .then( (response: ApiResponse<BrandVehicle>) => {
                this.fetchBrandVehicleList(1);

                this.props.setAlertBrandVehicleShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<BrandVehicle>) => {
                this.props.setAlertBrandVehicleShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let brandVehicleList: any = <TableItemEmpty />;

        if (this.props.brandVehicleList.length > 0) {
            brandVehicleList = this.props.brandVehicleList.map((item: BrandVehicle, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteBrandVehicle={this.deleteBrandVehicle}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.brandVehicleAlert.color} isOpen={this.props.brandVehicleAlert.visible} toggle={() => this.props.setAlertBrandVehicleHideAction()} fade={false}>
                <div>{this.props.brandVehicleAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Brand Vehicle</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/brand-vehicle/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Brand Vehicle
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
                                        {brandVehicleList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchBrandVehicleAction} />
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
    brandVehicleList: BrandVehicle[],
    paginate: Paginator,
    brandVehicleAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        brandVehicleList: state.brandVehicle.list,
        paginate: state.brandVehicle.paginate,
        brandVehicleAlert: state.brandVehicle.alert
    }
}

interface LinkDispatchToProps {
    fetchBrandVehicleAction: (page: number) => void,
    deleteBrandVehicleAction: (id: number) => Promise<ApiResponse<BrandVehicle>>,
    setAlertBrandVehicleHideAction: () => void,
    setAlertBrandVehicleShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchBrandVehicleAction: (page: number) => dispatch(fetchBrandVehicleAction(page)),
        deleteBrandVehicleAction: (id: number) => dispatch(deleteBrandVehicleAction(id)),
        setAlertBrandVehicleHideAction: () => dispatch(setAlertBrandVehicleHideAction()),
        setAlertBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertBrandVehicleShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Brand Vehicle")
                    )
                );