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
    Progress,
    Badge,
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
    fetchCustomerAction,
    setAlertCustomerHideAction,
    setAlertCustomerShowAction,
    clearFilterAction,
    activeCustomerAction,
    deactiveCustomerAction,
} from '../../../actions/admin/customer';
import { Customer } from '../../../types/admin/customer';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';

import {
    argonReactImage
} from '../../../helpers/Assets'
import { parseDateTimeFormat, voucherUsedFormat } from '../../../helpers/utils';
import Spinner from '../../../components/Loader/Spinner'
import Filter from './Filter'
import swal from 'sweetalert'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: Customer,
    key: number,
    activeCustomer: (id: number) => void,
    deactiveCustomer: (id: number) => void
}) => {
    return (
        <tr>
            <td>
                {props.index + 1}
            </td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.email}</td>
            <td>{props.item.isActive ? "Aktif" : "Tidak Aktif"}</td>
            <td>
                <Link to={`/admin/customer/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
                {
                    props.item.isActive ? (
                        <Button color="danger" size="sm" onClick={() => props.deactiveCustomer(props.item.id)}>
                            <i className="fa fa-times"></i> Non Aktif
                        </Button>
                    ) : (
                        <Button color="info" size="sm" onClick={() => props.activeCustomer(props.item.id)}>
                            <i className="fa fa-check"></i> Aktifkan
                        </Button>
                    )
                }
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

        this.fetchCustomerList(page);
    }

    componentWillUnmount() {
        this.props.setAlertCustomerHideAction();
        this.props.clearFilterCustomerAction();
    }

    fetchCustomerList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchCustomerAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    activeCustomer = (id: number) => {
        swal("Apakah anda yakin?", "Mengaktifkan Data Customer ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.activeCustomerAction(id)
                .then( (response: ApiResponse<Customer>) => {
                    this.fetchCustomerList(1);

                    this.props.setAlertCustomerShowAction("Berhasil Mengaktifkan Customer", 'success');
                })
                .catch( (response: ApiResponse<Customer>) => {
                    this.props.setAlertCustomerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    deactiveCustomer = (id: number) => {
        swal("Apakah anda yakin?", "Menonaktifkan Data Customer ini!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deactiveCustomerAction(id)
                .then( (response: ApiResponse<Customer>) => {
                    this.fetchCustomerList(1);

                    this.props.setAlertCustomerShowAction("Berhasil Menonaktifkan Customer", 'success');
                })
                .catch( (response: ApiResponse<Customer>) => {
                    this.props.setAlertCustomerShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let customerList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.customerList.length > 0) {
                customerList = this.props.customerList.map((item: Customer, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               activeCustomer={this.activeCustomer}
                               deactiveCustomer={this.deactiveCustomer}
                               />
                ));
            } else {
                customerList = <TableItemEmpty />;
            }
        }
        const CAlert = (
            <Alert color={this.props.customerAlert.color} isOpen={this.props.customerAlert.visible} toggle={() => this.props.setAlertCustomerHideAction()} fade={false}>
                <div>{this.props.customerAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Customer</h3>
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
                                            <th>No Telepon</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchCustomerList(page)
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
    customerList: Customer[],
    paginate: Paginator,
    customerAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        customerList: state.customer.list,
        paginate: state.customer.paginate,
        customerAlert: state.customer.alert
    }
}

interface LinkDispatchToProps {
    fetchCustomerAction: (page: number) => Promise<Boolean>,
    setAlertCustomerHideAction: () => void,
    setAlertCustomerShowAction: (message: string, color: string) => void,
    clearFilterCustomerAction: () => void,
    activeCustomerAction: (id: number) => Promise<ApiResponse<Customer>>,
    deactiveCustomerAction: (id: number) => Promise<ApiResponse<Customer>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchCustomerAction: (page: number) => dispatch(fetchCustomerAction(page)),
        setAlertCustomerHideAction: () => dispatch(setAlertCustomerHideAction()),
        setAlertCustomerShowAction: (message: string, color: string) => dispatch(setAlertCustomerShowAction(message, color)),
        clearFilterCustomerAction: () => dispatch(clearFilterAction()),
        activeCustomerAction: (id: number) => dispatch(activeCustomerAction(id)),
        deactiveCustomerAction: (id: number) => dispatch(deactiveCustomerAction(id)),
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Customer")
                    )
                );