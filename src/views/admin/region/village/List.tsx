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
    fetchVillageAction,
    deleteVillageAction,
    setAlertVillageHideAction,
    setAlertVillageShowAction
} from '../../../../actions/admin/region/village';
import { Village, VillageList } from '../../../../types/admin/region/village';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';
import Spinner from '../../../../components/Loader/Spinner'

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: VillageList,
    key: number,
    deleteVillage: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/village/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteVillage(props.item.id)}>
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

        this.fetchVillageList(page);
    }

    componentWillUnmount() {
        this.props.setAlertVillageHideAction();
    }

    fetchVillageList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchVillageAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    deleteVillage = (id: number) => {
        this.props.deleteVillageAction(id)
            .then( (response: ApiResponse<Village>) => {
                this.fetchVillageList(1);

                this.props.setAlertVillageShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<Village>) => {
                this.props.setAlertVillageShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let villageList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.villageList.length > 0) {
                villageList = this.props.villageList.map((item: VillageList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteVillage={this.deleteVillage}
                               />
                ));
            } else {
                villageList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.villageAlert.color} isOpen={this.props.villageAlert.visible} toggle={() => this.props.setAlertVillageHideAction()} fade={false}>
                <div>{this.props.villageAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Village</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/village/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Village
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
                                        {villageList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchVillageAction} />
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
    villageList: VillageList[],
    paginate: Paginator,
    villageAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        villageList: state.village.list,
        paginate: state.village.paginate,
        villageAlert: state.village.alert
    }
}

interface LinkDispatchToProps {
    fetchVillageAction: (page: number) => Promise<Boolean>,
    deleteVillageAction: (id: number) => Promise<ApiResponse<Village>>,
    setAlertVillageHideAction: () => void,
    setAlertVillageShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchVillageAction: (page: number) => dispatch(fetchVillageAction(page)),
        deleteVillageAction: (id: number) => dispatch(deleteVillageAction(id)),
        setAlertVillageHideAction: () => dispatch(setAlertVillageHideAction()),
        setAlertVillageShowAction: (message: string, color: string) => dispatch(setAlertVillageShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Village")
                    )
                );