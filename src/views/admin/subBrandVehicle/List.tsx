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
    fetchSubBrandVehicleAction,
    deleteSubBrandVehicleAction,
    setAlertSubBrandVehicleHideAction,
    setAlertSubBrandVehicleShowAction
} from '../../../actions/admin/subBrandVehicle';
import { SubBrandVehicle } from '../../../types/admin/subBrandVehicle';
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
    item: SubBrandVehicle,
    key: number,
    deleteSubBrandVehicle: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.brandVehicle.name}</td>
            <td>
                <Link to={`/admin/sub-brand-vehicle/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteSubBrandVehicle(props.item.id)}>
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

        this.fetchSubBrandVehicleList(page);
    }

    componentWillUnmount() {
        this.props.setAlertSubBrandVehicleHideAction();
    }

    fetchSubBrandVehicleList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchSubBrandVehicleAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteSubBrandVehicle = (id: number) => {
        this.props.deleteSubBrandVehicleAction(id)
            .then( (response: ApiResponse<SubBrandVehicle>) => {
                this.fetchSubBrandVehicleList(1);

                this.props.setAlertSubBrandVehicleShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<SubBrandVehicle>) => {
                this.props.setAlertSubBrandVehicleShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {
        let subBrandVehicleList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.subBrandVehicleList.length > 0) {
                subBrandVehicleList = this.props.subBrandVehicleList.map((item: SubBrandVehicle, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteSubBrandVehicle={this.deleteSubBrandVehicle}
                               />
                ));
            } else {
                subBrandVehicleList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.subBrandVehicleAlert.color} isOpen={this.props.subBrandVehicleAlert.visible} toggle={() => this.props.setAlertSubBrandVehicleHideAction()} fade={false}>
                <div>{this.props.subBrandVehicleAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Sub Brand Vehicle</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/sub-brand-vehicle/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Sub Brand Vehicle
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
                                            <th>Brand Vehicle</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subBrandVehicleList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchSubBrandVehicleAction} />
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
    subBrandVehicleList: SubBrandVehicle[],
    paginate: Paginator,
    subBrandVehicleAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        subBrandVehicleList: state.subBrandVehicle.list,
        paginate: state.subBrandVehicle.paginate,
        subBrandVehicleAlert: state.subBrandVehicle.alert
    }
}

interface LinkDispatchToProps {
    fetchSubBrandVehicleAction: (page: number) => Promise<Boolean>,
    deleteSubBrandVehicleAction: (id: number) => Promise<ApiResponse<SubBrandVehicle>>,
    setAlertSubBrandVehicleHideAction: () => void,
    setAlertSubBrandVehicleShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchSubBrandVehicleAction: (page: number) => dispatch(fetchSubBrandVehicleAction(page)),
        deleteSubBrandVehicleAction: (id: number) => dispatch(deleteSubBrandVehicleAction(id)),
        setAlertSubBrandVehicleHideAction: () => dispatch(setAlertSubBrandVehicleHideAction()),
        setAlertSubBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertSubBrandVehicleShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Sub Brand Vehicle")
                    )
                );