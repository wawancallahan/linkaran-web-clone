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
    fetchProvinceAction,
    deleteProvinceAction,
    setAlertProvinceHideAction,
    setAlertProvinceShowAction,
    clearFilterAction
} from '../../../../actions/admin/region/province';
import { Province, ProvinceList } from '../../../../types/admin/region/province';
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
    item: ProvinceList,
    key: number,
    deleteProvince: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/province/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteProvince(props.item.id)}>
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

        this.fetchProvinceList(page);
    }

    componentWillUnmount() {
        this.props.setAlertProvinceHideAction();
        this.props.clearFilterProvinceAction();
    }

    fetchProvinceList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchProvinceAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteProvince = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteProvinceAction(id)
                .then( (response: ApiResponse<Province>) => {
                    this.fetchProvinceList(1);

                    this.props.setAlertProvinceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Province>) => {
                    this.props.setAlertProvinceShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let provinceList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.provinceList.length > 0) {
                provinceList = this.props.provinceList.map((item: ProvinceList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteProvince={this.deleteProvince}
                               />
                ));
            } else {
                provinceList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.provinceAlert.color} isOpen={this.props.provinceAlert.visible} toggle={() => this.props.setAlertProvinceHideAction()} fade={false}>
                <div>{this.props.provinceAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Provinsi</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/province/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Provinsi
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
                                        {provinceList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchProvinceList(page)
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
    provinceList: ProvinceList[],
    paginate: Paginator,
    provinceAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        provinceList: state.province.list,
        paginate: state.province.paginate,
        provinceAlert: state.province.alert
    }
}

type LinkDispatchToProps = {
    fetchProvinceAction: (page: number) => Promise<Boolean>,
    deleteProvinceAction: (id: number) => Promise<ApiResponse<Province>>,
    setAlertProvinceHideAction: () => void,
    setAlertProvinceShowAction: (message: string, color: string) => void,
    clearFilterProvinceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchProvinceAction: (page: number) => dispatch(fetchProvinceAction(page)),
        deleteProvinceAction: (id: number) => dispatch(deleteProvinceAction(id)),
        setAlertProvinceHideAction: () => dispatch(setAlertProvinceHideAction()),
        setAlertProvinceShowAction: (message: string, color: string) => dispatch(setAlertProvinceShowAction(message, color)),
        clearFilterProvinceAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Provinsi")
                    )
                );