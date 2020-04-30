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
    fetchBankAction,
    setAlertBankHideAction,
    setAlertBankShowAction,
    deleteBankAction,
    clearFilterAction
} from '../../../actions/admin/bank';
import { BankList, Bank } from '../../../types/admin/bank';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import swal from 'sweetalert'
import Filter from './Filter'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: BankList,
    key: number,
    deleteBank: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.nama}</td>
            <td>{props.item.bankName}</td>
            <td>{props.item.accountName}</td>
            <td>{props.item.accountNumber}</td>
            <td>
                <Link to={`/admin/bank/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteBank(props.item.id)}>
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

        this.fetchBankList(page);
    }

    componentWillUnmount() {
        this.props.setAlertBankHideAction();
        this.props.clearFilterBankAction();
    }

    fetchBankList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchBankAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteBank = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteBankAction(id)
                .then( (response: ApiResponse<Bank>) => {
                    this.fetchBankList(1);
    
                    this.props.setAlertBankShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Bank>) => {
                    this.props.setAlertBankShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let bank: any = <TableItemEmpty />;

        if (this.props.bank.length > 0) {
            bank = this.props.bank.map((item: BankList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteBank={this.deleteBank}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.bankAlert.color} isOpen={this.props.bankAlert.visible} toggle={() => this.props.setAlertBankHideAction()} fade={false}>
                <div>{this.props.bankAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Bank</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/bank/create">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah Bank
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
                                            <th>Nama Bank</th>
                                            <th>Nama Akun</th>
                                            <th>Nomor Akun</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bank}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchBankList(page)
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
    bank: BankList[],
    paginate: Paginator,
    bankAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        bank: state.bank.list,
        paginate: state.bank.paginate,
        bankAlert: state.bank.alert
    }
}

interface LinkDispatchToProps {
    fetchBankAction: (page: number) => Promise<Boolean>,
    setAlertBankHideAction: () => void,
    setAlertBankShowAction: (message: string, color: string) => void,
    deleteBankAction: (id: number) => Promise<ApiResponse<Bank>>,
    clearFilterBankAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchBankAction: (page: number) => dispatch(fetchBankAction(page)),
        setAlertBankHideAction: () => dispatch(setAlertBankHideAction()),
        setAlertBankShowAction: (message: string, color: string) => dispatch(setAlertBankShowAction(message, color)),
        deleteBankAction: (id: number) => dispatch(deleteBankAction(id)),
        clearFilterBankAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Bank")
                    )
                );