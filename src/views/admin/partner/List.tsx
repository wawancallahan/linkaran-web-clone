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
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchPartnerAction,
    deletePartnerAction,
    activePartnerAction,
    deactivePartnerAction,
    setAlertPartnerHideAction,
    setAlertPartnerShowAction,
    clearFilterAction
} from '../../../actions/admin/partner';
import { Partner, PartnerList } from '../../../types/admin/partner';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import { parseDateFormat, booleanToActiveStatus } from '../../../helpers/utils';
import Filter from './Filter'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: PartnerList,
    key: number,
    deletePartner: (id: number) => void,
    activePartner: (id: number) => void,
    deactivePartner: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.companyName}</td>
            <td>{parseDateFormat(props.item.startWorkingTogether)}</td>
            <td>{parseDateFormat(props.item.endWorkingTogether)}</td>
            <td>{booleanToActiveStatus(props.item.active)}</td>
            <td>{props.item.user.name}</td>
            <td>
                {
                    props.item.active ? (
                        <Button color="danger" size="sm" onClick={() => props.deactivePartner(props.item.id)}>
                            <i className="fa fa-times"></i> Non Aktif
                        </Button>
                    ) : (
                        <Button color="info" size="sm" onClick={() => props.activePartner(props.item.id)}>
                            <i className="fa fa-check"></i> Aktifkan
                        </Button>
                    )
                }
                <Link to={`/admin/partner/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deletePartner(props.item.id)}>
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

        this.fetchPartnerList(page);
    }

    componentWillUnmount() {
        this.props.setAlertPartnerHideAction();
        this.props.clearFilterPartnerAction();
    }

    fetchPartnerList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchPartnerAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deletePartner = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deletePartnerAction(id)
                .then( (response: ApiResponse<Partner>) => {
                    this.fetchPartnerList(1);

                    this.props.setAlertPartnerShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    this.props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    activePartner = (id: number) => {
        swal("Apakah anda yakin?", "Mengaktifkan Data Partner ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.activePartnerAction(id)
                .then( (response: ApiResponse<Partner>) => {
                    this.fetchPartnerList(1);

                    this.props.setAlertPartnerShowAction("Berhasil Mengaktifkan Partner", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    this.props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    deactivePartner = (id: number) => {
        swal("Apakah anda yakin?", "Menonaktifkan Data Partner ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deactivePartnerAction(id)
                .then( (response: ApiResponse<Partner>) => {
                    this.fetchPartnerList(1);

                    this.props.setAlertPartnerShowAction("Berhasil Menonaktifkan Partner", 'success');
                })
                .catch( (response: ApiResponse<Partner>) => {
                    this.props.setAlertPartnerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let partnerList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.partnerList.length > 0) {
                partnerList = this.props.partnerList.map((item: PartnerList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deletePartner={this.deletePartner}
                               activePartner={this.activePartner}
                               deactivePartner={this.deactivePartner}
                               />
                ));
            } else {
                partnerList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.partnerAlert.color} isOpen={this.props.partnerAlert.visible} toggle={() => this.props.setAlertPartnerHideAction()} fade={false}>
                <div>{this.props.partnerAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Partner</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/partner/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Partner
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
                                            <th>Waktu Mulai</th>
                                            <th>Waktu Berakhir</th>
                                            <th>Status</th>
                                            <th>Penanggung Jawab</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {partnerList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchPartnerList(page)
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

interface LinkStateToProps {
    partnerList: PartnerList[],
    paginate: Paginator,
    partnerAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        partnerList: state.partner.list,
        paginate: state.partner.paginate,
        partnerAlert: state.partner.alert
    }
}

interface LinkDispatchToProps {
    fetchPartnerAction: (page: number) => Promise<Boolean>,
    deletePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
    activePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
    deactivePartnerAction: (id: number) => Promise<ApiResponse<Partner>>,
    setAlertPartnerHideAction: () => void,
    setAlertPartnerShowAction: (message: string, color: string) => void,
    clearFilterPartnerAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchPartnerAction: (page: number) => dispatch(fetchPartnerAction(page)),
        deletePartnerAction: (id: number) => dispatch(deletePartnerAction(id)),
        activePartnerAction: (id: number) => dispatch(activePartnerAction(id)),
        deactivePartnerAction: (id: number) => dispatch(deactivePartnerAction(id)),
        setAlertPartnerHideAction: () => dispatch(setAlertPartnerHideAction()),
        setAlertPartnerShowAction: (message: string, color: string) => dispatch(setAlertPartnerShowAction(message, color)),
        clearFilterPartnerAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Partner")
                    )
                );