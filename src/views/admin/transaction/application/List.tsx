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
    Alert,
    Badge,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
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
import {
    fetchApplicationAction,
    setAlertApplicationHideAction,
    setAlertApplicationShowAction
} from '../../../../actions/admin/transaction/application';
import { Application } from '../../../../types/admin/transaction/application';
import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

import { typeOfTransaction, colorStatusFormat, typeTransactionFormat } from '../../../../helpers/utils';
import { amountFormat } from '../../../../helpers/number';
import NumberFormat from 'react-number-format'

type ListProps = RouteComponentProps<{
    type?: string
}> & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    dropdownVisible: boolean
}

const TableItem = (props: {
    index: number,
    item: Application,
    key: number,
    type: string
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.date}</td>
            <td>{props.item.numberTransaction}</td>
            <td>{props.item.costumerName}</td>
            <td>{props.item.driverName}</td>
            <td>
                <Badge color="success">{props.item.service}</Badge>
            </td>
                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.totalCost} /></td>
            <td>
                <Badge color={colorStatusFormat(props.item.status)}>{props.item.status}</Badge>
            </td>
            <td>
                <Link to={`/admin/transaction/application/${props.type}/${props.item.numberTransaction}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
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
        dropdownVisible: false
    }

    componentDidMount() {
        this.loadApplicationList();
    }

    loadApplicationList = (typeParams?: string) => {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        let type = this.typeTransaction();

        if (typeParams) {
            type = typeParams
        }

        this.fetchApplicationList(page, type);
    }

    typeTransaction = () => {
        const typeParams = this.props.match.params.type;

        const type = typeTransactionFormat(typeParams)

        return type;
    }

    componentWillUnmount() {
        this.props.setAlertApplicationHideAction();
    }

    fetchApplicationList = (page: number, type: string) => {
        this.props.fetchApplicationAction(page, type);
    }

    goToTransactionRoute = (type: string) => {
        this.props.history.push(`/admin/transaction/application/${type}`)
        this.loadApplicationList(type);
    }

    dropdownToggle = () => {
        this.setState(prevState => {
            return {
                dropdownVisible: ! prevState.dropdownVisible
            }
        })
    }

    render() {

        let transactionApplication: any = <TableItemEmpty />;

        const type = typeTransactionFormat(this.props.match.params.type);

        if (this.props.transactionApplication.length > 0) {
            transactionApplication = this.props.transactionApplication.map((item: Application, index: number) => (
                <TableItem key={index}
                           item={item}
                           index={index}
                           type={type}
                           />
            ));
        }

        const CAlert = (
            <Alert color={this.props.transactionApplicationAlert.color} isOpen={this.props.transactionApplicationAlert.visible} toggle={() => this.props.setAlertApplicationHideAction()} fade={false}>
                <div>{this.props.transactionApplicationAlert.message}</div>
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
                                    <Row className="align-items-center mb-3">
                                        <div className="col">
                                            <h3 className="mb-0">Daftar Transaksi Aplikasi</h3>
                                        </div>
                                    </Row>
                                    <Row>
                                        <Dropdown isOpen={this.state.dropdownVisible} toggle={this.dropdownToggle}>
                                            <DropdownToggle caret>
                                                {this.typeTransaction()}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => {
                                                    this.goToTransactionRoute('complete')
                                                }}>
                                                    Complete
                                                </DropdownItem>

                                                <DropdownItem onClick={() => {
                                                    this.goToTransactionRoute('inprogress')
                                                }}>
                                                    In Progress
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </Row>
                                </CardHeader>

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th>No</th>
                                            <th>Tanggal & Waktu</th>
                                            <th>No Transaksi</th>
                                            <th>Pelanggan</th>
                                            <th>Driver</th>
                                            <th>Layanan</th>
                                            <th>Total Transaksi</th>
                                            <th>Status</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionApplication}
                                    </tbody>
                                </Table>
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => this.props.fetchApplicationAction(page, type)} />
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
    transactionApplication: Application[],
    paginate: Paginator,
    transactionApplicationAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        transactionApplication: state.transactionApplication.list,
        paginate: state.transactionApplication.paginate,
        transactionApplicationAlert: state.transactionApplication.alert
    }
}

interface LinkDispatchToProps {
    fetchApplicationAction: (page: number, type: string) => void,
    setAlertApplicationHideAction: () => void,
    setAlertApplicationShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchApplicationAction: (page: number, type: string = 'complete') => dispatch(fetchApplicationAction(page, type)),
        setAlertApplicationHideAction: () => dispatch(setAlertApplicationHideAction()),
        setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Transaksi Aplikasi")
                    )
                );