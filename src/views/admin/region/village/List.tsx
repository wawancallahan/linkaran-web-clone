import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';

import HeaderView from "../../../../components/Headers/HeaderView";
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
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchVillageAction,
    deleteVillageAction,
    setAlertVillageHideAction,
    setAlertVillageShowAction,
    clearFilterAction
} from '../../../../actions/admin/region/village';
import { Village, VillageList } from '../../../../types/admin/region/village';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';
import Spinner from '../../../../components/Loader/Spinner'
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
    item: VillageList,
    key: number,
    deleteVillage: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/village/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteVillage(props.item.id)}>
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

        this.fetchVillageList(page);
    }

    componentWillUnmount() {
        this.props.setAlertVillageHideAction();
        this.props.clearFilterVillageAction();
    }

    fetchVillageList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchVillageAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteVillage = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteVillageAction(id)
                .then( (response: ApiResponse<Village>) => {
                    this.fetchVillageList(1);

                    this.props.setAlertVillageShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Village>) => {
                    this.props.setAlertVillageShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let villageList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.villageList.length > 0) {
                villageList = this.props.villageList.map((item: VillageList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteVillage={this.deleteVillage}
                               />
                ));
            } else {
                villageList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.villageAlert.color} isOpen={this.props.villageAlert.visible} toggle={() => this.props.setAlertVillageHideAction()} fade={false}>
                <div>{this.props.villageAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Kelurahan</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/village/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Kelurahan
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
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {villageList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchVillageList(page)
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
    villageList: VillageList[],
    paginate: Paginator,
    villageAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        villageList: state.village.list,
        paginate: state.village.paginate,
        villageAlert: state.village.alert
    }
}

type LinkDispatchToProps = {
    fetchVillageAction: (page: number) => Promise<Boolean>,
    deleteVillageAction: (id: number) => Promise<ApiResponse<Village>>,
    setAlertVillageHideAction: () => void,
    setAlertVillageShowAction: (message: string, color: string) => void,
    clearFilterVillageAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchVillageAction: (page: number) => dispatch(fetchVillageAction(page)),
        deleteVillageAction: (id: number) => dispatch(deleteVillageAction(id)),
        setAlertVillageHideAction: () => dispatch(setAlertVillageHideAction()),
        setAlertVillageShowAction: (message: string, color: string) => dispatch(setAlertVillageShowAction(message, color)),
        clearFilterVillageAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Kelurahan")
                    )
                );