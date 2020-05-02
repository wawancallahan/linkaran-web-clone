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
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    fetchCountryAction,
    deleteCountryAction,
    setAlertCountryHideAction,
    setAlertCountryShowAction,
    clearFilterAction
} from '../../../../actions/admin/region/country';
import { Country, CountryList } from '../../../../types/admin/region/country';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';
import Spinner from '../../../../components/Loader/Spinner'
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
    item: CountryList,
    key: number,
    deleteCountry: (id: number) => void
}) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/country/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => props.deleteCountry(props.item.id)}>
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

        this.fetchCountryList(page);
    }

    componentWillUnmount() {
        this.props.setAlertCountryHideAction();
        this.props.clearFilterCountryAction();
    }

    fetchCountryList = (page: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchCountryAction(page).then(() => {
                this.setState({
                    loader: false
                })
            });

            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page.toString());

            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        });
    }

    deleteCountry = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                this.props.deleteCountryAction(id)
                .then( (response: ApiResponse<Country>) => {
                    this.fetchCountryList(1);

                    this.props.setAlertCountryShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Country>) => {
                    this.props.setAlertCountryShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    render() {

        let countryList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.countryList.length > 0) {
                countryList = this.props.countryList.map((item: CountryList, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               deleteCountry={this.deleteCountry}
                               />
                ));
            } else {
                countryList = <TableItemEmpty />;
            }
        }

        const CAlert = (
            <Alert color={this.props.countryAlert.color} isOpen={this.props.countryAlert.visible} toggle={() => this.props.setAlertCountryHideAction()} fade={false}>
                <div>{this.props.countryAlert.message}</div>
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
                                            <h3 className="mb-0">Daftar Negara</h3>
                                        </div>
                                        <div className="col text-right">
                                        <Link to="/admin/region/country/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Negara
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
                                            <th>Option</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {countryList}
                                    </tbody>
                                </Table>

                                {loaderSpinner}
                                
                                <CardFooter className="py-4">
                                    <Pagination pageCount={this.props.paginate.pageCount}
                                                    currentPage={this.props.paginate.currentPage}
                                                    itemCount={this.props.paginate.itemCount}
                                                    itemClicked={(page: number) => {
                                                        this.fetchCountryList(page)
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
    countryList: CountryList[],
    paginate: Paginator,
    countryAlert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        countryList: state.country.list,
        paginate: state.country.paginate,
        countryAlert: state.country.alert
    }
}

interface LinkDispatchToProps {
    fetchCountryAction: (page: number) => Promise<Boolean>,
    deleteCountryAction: (id: number) => Promise<ApiResponse<Country>>,
    setAlertCountryHideAction: () => void,
    setAlertCountryShowAction: (message: string, color: string) => void,
    clearFilterCountryAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListProps): LinkDispatchToProps => {
    return {
        fetchCountryAction: (page: number) => dispatch(fetchCountryAction(page)),
        deleteCountryAction: (id: number) => dispatch(deleteCountryAction(id)),
        setAlertCountryHideAction: () => dispatch(setAlertCountryHideAction()),
        setAlertCountryShowAction: (message: string, color: string) => dispatch(setAlertCountryShowAction(message, color)),
        clearFilterCountryAction: () => dispatch(clearFilterAction())
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(List, "Daftar Negara")
                    )
                );