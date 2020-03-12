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
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchSubDistrictAction,
    deleteSubDistrictAction,
    setAlertSubDistrictHideAction,
    setAlertSubDistrictShowAction
} from '../../../../actions/admin/region/subDistrict';
import { SubDistrict, SubDistrictList } from '../../../../types/admin/region/subDistrict';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';
import Spinner from '../../../../components/Loader/Spinner'
import swal from 'sweetalert'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: SubDistrictList,
    key: number,
    deleteSubDistrict: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/sub-district/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteSubDistrict(props.item.id)}>
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

        this.fetchSubDistrictList(page);
    }

    componentWillUnmount() {
        this.props.setAlertSubDistrictHideAction();
    }

    fetchSubDistrictList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchSubDistrictAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteSubDistrict = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteSubDistrictAction(id)
                .then( (response: ApiResponse<SubDistrict>) => {
                    this.fetchSubDistrictList(1);

                    this.props.setAlertSubDistrictShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<SubDistrict>) => {
                    this.props.setAlertSubDistrictShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let subDistrictList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.subDistrictList.length > 0) {
                subDistrictList = this.props.subDistrictList.map((item: SubDistrictList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteSubDistrict={this.deleteSubDistrict}
                               />
                ));
            } else {
                subDistrictList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.subDistrictAlert.color} isOpen={this.props.subDistrictAlert.visible} toggle={() => this.props.setAlertSubDistrictHideAction()} fade={false}>
                <div>{this.props.subDistrictAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Kecamatan</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/sub-district/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Kecamatan
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
                                        {subDistrictList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchSubDistrictAction} />
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
    subDistrictList: SubDistrictList[],
    paginate: Paginator,
    subDistrictAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        subDistrictList: state.subDistrict.list,
        paginate: state.subDistrict.paginate,
        subDistrictAlert: state.subDistrict.alert
    }
}

interface LinkDispatchToProps {
    fetchSubDistrictAction: (page: number) => Promise<Boolean>,
    deleteSubDistrictAction: (id: number) => Promise<ApiResponse<SubDistrict>>,
    setAlertSubDistrictHideAction: () => void,
    setAlertSubDistrictShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchSubDistrictAction: (page: number) => dispatch(fetchSubDistrictAction(page)),
        deleteSubDistrictAction: (id: number) => dispatch(deleteSubDistrictAction(id)),
        setAlertSubDistrictHideAction: () => dispatch(setAlertSubDistrictHideAction()),
        setAlertSubDistrictShowAction: (message: string, color: string) => dispatch(setAlertSubDistrictShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Kecamatan")
                    )
                );