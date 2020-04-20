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
    fetchDistrictAction,
    deleteDistrictAction,
    setAlertDistrictHideAction,
    setAlertDistrictShowAction,
    clearFilterAction
} from '../../../../actions/admin/region/district';
import { District, DistrictList } from '../../../../types/admin/region/district';
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
    item: DistrictList,
    key: number,
    deleteDistrict: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/district/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteDistrict(props.item.id)}>
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

        this.fetchDistrictList(page);
    }

    componentWillUnmount() {
        this.props.setAlertDistrictHideAction();
        this.props.clearFilterDistrictAction();
    }

    fetchDistrictList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchDistrictAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteDistrict = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteDistrictAction(id)
                .then( (response: ApiResponse<District>) => {
                    this.fetchDistrictList(1);

                    this.props.setAlertDistrictShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<District>) => {
                    this.props.setAlertDistrictShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let districtList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.districtList.length > 0) {
                districtList = this.props.districtList.map((item: DistrictList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteDistrict={this.deleteDistrict}
                               />
                ));
            } else {
                districtList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.districtAlert.color} isOpen={this.props.districtAlert.visible} toggle={() => this.props.setAlertDistrictHideAction()} fade={false}>
                <div>{this.props.districtAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Kabupaten/ Kota</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/district/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Kabupaten/ Kota
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
                                        {districtList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchDistrictAction} />
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
    districtList: DistrictList[],
    paginate: Paginator,
    districtAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        districtList: state.district.list,
        paginate: state.district.paginate,
        districtAlert: state.district.alert
    }
}

interface LinkDispatchToProps {
    fetchDistrictAction: (page: number) => Promise<Boolean>,
    deleteDistrictAction: (id: number) => Promise<ApiResponse<District>>,
    setAlertDistrictHideAction: () => void,
    setAlertDistrictShowAction: (message: string, color: string) => void,
    clearFilterDistrictAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchDistrictAction: (page: number) => dispatch(fetchDistrictAction(page)),
        deleteDistrictAction: (id: number) => dispatch(deleteDistrictAction(id)),
        setAlertDistrictHideAction: () => dispatch(setAlertDistrictHideAction()),
        setAlertDistrictShowAction: (message: string, color: string) => dispatch(setAlertDistrictShowAction(message, color)),
        clearFilterDistrictAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Kabupaten/ Kota")
                    )
                );