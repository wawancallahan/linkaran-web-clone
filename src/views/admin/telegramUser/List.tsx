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
    fetchTelegramUserAction,
    deleteTelegramUserAction,
    setAlertTelegramUserHideAction,
    setAlertTelegramUserShowAction
} from '../../../actions/admin/telegramUser';
import { TelegramUser, TelegramUserList } from '../../../types/admin/telegramUser';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: TelegramUserList,
    key: number,
    deleteTelegramUser: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.telegramuser}</td>
            <td>
                <Link to={`/admin/telegram-user/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteTelegramUser(props.item.id)}>
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

        this.fetchTelegramUserList(page);
    }

    componentWillUnmount() {
        this.props.setAlertTelegramUserHideAction();
    }

    fetchTelegramUserList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchTelegramUserAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteTelegramUser = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteTelegramUserAction(id)
                .then( (response: ApiResponse<TelegramUser>) => {
                    this.fetchTelegramUserList(1);

                    this.props.setAlertTelegramUserShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<TelegramUser>) => {
                    this.props.setAlertTelegramUserShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let telegramUserList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.telegramUserList.length > 0) {
                telegramUserList = this.props.telegramUserList.map((item: TelegramUserList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteTelegramUser={this.deleteTelegramUser}
                               />
                ));
            } else {
                telegramUserList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.telegramUserAlert.color} isOpen={this.props.telegramUserAlert.visible} toggle={() => this.props.setAlertTelegramUserHideAction()} fade={false}>
                <div>{this.props.telegramUserAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Telegram User</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/telegramUser/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Telegram User
                                            </Button>
                                        </Link>
                                        </div>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Telegram</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {telegramUserList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchTelegramUserAction} />
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
    telegramUserList: TelegramUserList[],
    paginate: Paginator,
    telegramUserAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        telegramUserList: state.telegramUser.list,
        paginate: state.telegramUser.paginate,
        telegramUserAlert: state.telegramUser.alert
    }
}

interface LinkDispatchToProps {
    fetchTelegramUserAction: (page: number) => Promise<Boolean>,
    deleteTelegramUserAction: (id: number) => Promise<ApiResponse<TelegramUser>>,
    setAlertTelegramUserHideAction: () => void,
    setAlertTelegramUserShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchTelegramUserAction: (page: number) => dispatch(fetchTelegramUserAction(page)),
        deleteTelegramUserAction: (id: number) => dispatch(deleteTelegramUserAction(id)),
        setAlertTelegramUserHideAction: () => dispatch(setAlertTelegramUserHideAction()),
        setAlertTelegramUserShowAction: (message: string, color: string) => dispatch(setAlertTelegramUserShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Telegram User")
                    )
                );