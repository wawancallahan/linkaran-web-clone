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
    deleteUserAction
} from '../../../actions/admin/user';
import { User } from '../../../types/admin/user';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';


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

    fetchUserList = (page: number) => {
        this.props.fetchUserAction(page);
    }

    deleteUser = (id: number) => {
        this.props.deleteUserAction(id)
            .then( (response: ApiResponseList<User>) => {
                this.fetchUserList(1);
            })
            .catch( (response: ApiResponseList<User>) => {
                console.log(
                    response.error!.metaData.message
                );
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
                                                    activePage={this.props.paginate.activePage}
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
    paginate: Paginator
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        userList: state.user.list,
        paginate: state.user.paginate
    }
}

interface LinkDispatchToProps {
    fetchUserAction: (page: number) => void,
    deleteUserAction: (id: number) => Promise<ApiResponseList<User>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchUserAction: (page: number) => dispatch(fetchUserAction(page)),
        deleteUserAction: (id: number) => dispatch(deleteUserAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar User")
                    )
                );