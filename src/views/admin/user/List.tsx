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
    fetchUserAction,
    deleteUserAction,
    setAlertUserShowAction,
    setAlertUserHideAction,
    clearFilterAction
} from '../../../actions/admin/user';
import { User, UserList } from '../../../types/admin/user';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
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
    item: UserList,
    key: number,
    deleteUser: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.email}</td>
            <td>{props.item.telegramuser}</td>
            <td>
                <Link to={`/admin/user/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteUser(props.item.id)}>
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

        this.fetchUserList(page);
    }

    componentWillUnmount() {
        this.props.setAlertUserHideAction();
        this.props.clearFilterUserAction();
    }

   
    fetchUserList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchUserAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteUser = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteUserAction(id)
                .then( (response: ApiResponse<User>) => {
                    this.fetchUserList(1);

                    this.props.setAlertUserShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<User>) => {
                    this.props.setAlertUserShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let userList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.userList.length > 0) {
                userList = this.props.userList.map((item: UserList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteUser={this.deleteUser}
                               />
                ));
            } else {
                userList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.userAlert.color} isOpen={this.props.userAlert.visible} toggle={() => this.props.setAlertUserHideAction()} fade={false}>
                <div>{this.props.userAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar User</h3>
                                        </div>
                                        <div className="col text-right">
                                            <Link to="/admin/user/create">
                                                <Button
                                                    color="primary"
                                                    size="sm"
                                                >
                                                    Tambah User
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
                                            <th>No Telepon</th>
                                            <th>Email</th>
                                            <th>Telegram</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchUserList(page)
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
    userList: UserList[],
    paginate: Paginator,
    userAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        userList: state.user.list,
        paginate: state.user.paginate,
        userAlert: state.user.alert
    }
}

type LinkDispatchToProps = {
    fetchUserAction: (page: number) => Promise<Boolean>,
    deleteUserAction: (id: number) => Promise<ApiResponse<User>>,
    setAlertUserHideAction: () => void,
    setAlertUserShowAction: (message: string, color: string) => void,
    clearFilterUserAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchUserAction: (page: number) => dispatch(fetchUserAction(page)),
        deleteUserAction: (id: number) => dispatch(deleteUserAction(id)),
        setAlertUserHideAction: () => dispatch(setAlertUserHideAction()),
        setAlertUserShowAction: (message: string, color: string) => dispatch(setAlertUserShowAction(message, color)),
        clearFilterUserAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar User")
                    )
                );