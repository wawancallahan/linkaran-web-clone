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
    fetchUserAction,
    deleteUserAction,
    setAlertUserShowAction,
    setAlertUserHideAction
} from '../../../actions/admin/user';
import { User } from '../../../types/admin/user';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {

}

const TableItem = (props: {
    index: number,
    item: User,
    key: number,
    deleteUser: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.email}</td>
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

    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchUserList(page);
    }

    componentWillUnmount() {
        this.props.setAlertUserHideAction();
    }

    fetchUserList = (page: number) => {
        this.props.fetchUserAction(page);
    }

    deleteUser = (id: number) => {
        this.props.deleteUserAction(id)
            .then( (response: ApiResponse<User>) => {
                this.fetchUserList(1);

                this.props.setAlertUserShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<User>) => {
                this.props.setAlertUserShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let userList: any = <TableItemEmpty />;

        if (this.props.userList.length > 0) {
            userList = this.props.userList.map((item: User, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteUser={this.deleteUser}
                           />
            ));
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
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>No Telepon</th>
                                            <th>Email</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchUserAction} />
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
    userList: User[],
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

interface LinkDispatchToProps {
    fetchUserAction: (page: number) => void,
    deleteUserAction: (id: number) => Promise<ApiResponse<User>>,
    setAlertUserHideAction: () => void,
    setAlertUserShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchUserAction: (page: number) => dispatch(fetchUserAction(page)),
        deleteUserAction: (id: number) => dispatch(deleteUserAction(id)),
        setAlertUserHideAction: () => dispatch(setAlertUserHideAction()),
        setAlertUserShowAction: (message: string, color: string) => dispatch(setAlertUserShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar User")
                    )
                );