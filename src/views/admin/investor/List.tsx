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
    fetchInvestorApiAction,
    setAlertInvestorHideAction,
    setAlertInvestorShowAction,
    deleteInvestorAction
} from '../../../actions/admin/investor';
import { Investor } from '../../../types/admin/investor';
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
    item: Investor,
    key: number,
    deleteInvestor: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user.name}</td>
            <td>{props.item.user.phoneNumber}</td>
            <td>{props.item.user.email}</td>
            <td>{props.item.identityNumber}</td>
            <td>{props.item.gender}</td>
            <td>{props.item.dateOfBirth}</td>
            <td>
                <Link to={`/admin/investor/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteInvestor(props.item.id)}>
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

        this.fetchInvestorList(page);
    }

    componentWillUnmount() {
        this.props.setAlertInvestorHideAction();
    }

    fetchInvestorList(page: number) {
        this.props.fetchInvestorApiAction(page);
    }

    deleteInvestor = (id: number) => {
        this.props.deleteInvestorAction(id)
            .then( (response: ApiResponse<Investor>) => {
                this.fetchInvestorList(1);

                this.props.setAlertInvestorShowAction("Data Berhasil Dihapus", 'success');
            })
            .catch( (response: ApiResponse<Investor>) => {
                this.props.setAlertInvestorShowAction(response.error!.metaData.message, 'danger');
            });
    }

    render() {

        let investorList: any = <TableItemEmpty />;

        if (this.props.investorList.length > 0) {
            investorList = this.props.investorList.map((item: Investor, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           deleteInvestor={this.deleteInvestor}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.investorAlert.color} isOpen={this.props.investorAlert.visible} toggle={() => this.props.setAlertInvestorHideAction()} fade={false}>
                <div>{this.props.investorAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Investor</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/investor/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Investor
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
                                            <th>KTP</th>
                                            <th>Jenis Kelamin</th>
                                            <th>Tanggal Lahir</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {investorList}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={this.props.fetchInvestorApiAction} />
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
    investorList: Investor[],
    paginate: Paginator,
    investorAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        investorList: state.investor.list,
        paginate: state.investor.paginate,
        investorAlert: state.investor.alert
    }
}

interface LinkDispatchToProps {
    fetchInvestorApiAction: (page: number) => void,
    setAlertInvestorHideAction: () => void,
    setAlertInvestorShowAction: (message: string, color: string) => void,
    deleteInvestorAction: (id: number) => Promise<ApiResponse<Investor>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchInvestorApiAction: (page: number) => dispatch(fetchInvestorApiAction(page)),
        setAlertInvestorHideAction: () => dispatch(setAlertInvestorHideAction()),
        setAlertInvestorShowAction: (message: string, color: string) => dispatch(setAlertInvestorShowAction(message, color)),
        deleteInvestorAction: (id: number) => dispatch(deleteInvestorAction(id)),
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Investor")
                    )
                );