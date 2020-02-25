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
    fetchBankAction,
    setAlertBankHideAction,
    setAlertBankShowAction
} from '../../../actions/admin/bank';
import { BankList } from '../../../types/admin/bank';
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
    item: BankList,
    key: number
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
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
    }

    fetchBankList = (page: number) => {
        this.props.fetchBankAction(page);
    }

    render() {

        let bank: any = <TableItemEmpty />;

        if (this.props.bank.length > 0) {
            bank = this.props.bank.map((item: BankList, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
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
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>Atas Nama</th>
                                            <th>Nomor</th>
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
                                                    itemClicked={this.props.fetchBankAction} />
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
    fetchBankAction: (page: number) => void,
    setAlertBankHideAction: () => void,
    setAlertBankShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchBankAction: (page: number) => dispatch(fetchBankAction(page)),
        setAlertBankHideAction: () => dispatch(setAlertBankHideAction()),
        setAlertBankShowAction: (message: string, color: string) => dispatch(setAlertBankShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Bank")
                    )
                );