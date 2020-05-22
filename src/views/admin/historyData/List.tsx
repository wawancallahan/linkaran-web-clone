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
    fetchHistoryDataAction,
    setAlertHistoryDataHideAction,
    setAlertHistoryDataShowAction,
    clearFilterAction
} from '../../../actions/admin/historyData';
import { HistoryData, HistoryDataList } from '../../../types/admin/historyData/historyData';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';
import Spinner from '../../../components/Loader/Spinner'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';
import Filter from './Filter'
import { parseDateFormat } from '../../../helpers/utils';

type ListProps = RouteComponentProps & {

}

type Props = ListProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    loader: boolean
}

const TableItem = (props: {
    index: number,
    item: HistoryDataList,
    key: number
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user.name}</td>
            <td>{props.item.user.phoneNumber}</td>
            <td>{props.item.user.email}</td>
            <td>{props.item.entityName}</td>
            <td>{parseDateFormat(props.item.dateCreate)}</td>
            <td>{props.item.event}</td>
            <td>
                <Link to={`/admin/history-data/${props.item.id}`} className="btn btn-info btn-sm">
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
        loader: true
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        this.fetchHistoryDataList(page);
    }

    componentWillUnmount() {
        this.props.setAlertHistoryDataHideAction();
        this.props.clearFilterHistoryDataAction();
    }

    fetchHistoryDataList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchHistoryDataAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    render() {

        let historyDataList: any = null;

        let loaderSpinner = <Spinner type="Puff"
                                    color="#00BFFF"
                                    height={150}
                                    width={150}
                                    visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.historyDataList.length > 0) {
                historyDataList = this.props.historyDataList.map((item: HistoryDataList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               />
                ));
            } else {
                historyDataList = <TableItemEmpty />
            }
        }

        const CAlert = (
            <Alert color={this.props.historyDataAlert.color} isOpen={this.props.historyDataAlert.visible} toggle={() => this.props.setAlertHistoryDataHideAction()} fade={false}>
                <div>{this.props.historyDataAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Histori</h3>
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
                                            <th>No. Telepon</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Tanggal</th>
                                            <th>Event</th>
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historyDataList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchHistoryDataList(page)
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
    historyDataList: HistoryDataList[],
    paginate: Paginator,
    historyDataAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        historyDataList: state.historyData.list,
        paginate: state.historyData.paginate,
        historyDataAlert: state.historyData.alert
    }
}

type LinkDispatchToProps = {
    fetchHistoryDataAction: (page: number) => Promise<Boolean>,
    setAlertHistoryDataHideAction: () => void,
    setAlertHistoryDataShowAction: (message: string, color: string) => void,
    clearFilterHistoryDataAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchHistoryDataAction: (page: number) => dispatch(fetchHistoryDataAction(page)),
        setAlertHistoryDataHideAction: () => dispatch(setAlertHistoryDataHideAction()),
        setAlertHistoryDataShowAction: (message: string, color: string) => dispatch(setAlertHistoryDataShowAction(message, color)),
        clearFilterHistoryDataAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Histori")
                    )
                );