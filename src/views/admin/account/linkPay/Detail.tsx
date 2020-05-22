import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';

import HeaderView from "../../../../components/Headers/HeaderView";
import {
    Container,
    Row,
    Card,
    CardHeader,
    CardBody,
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
    findAccountLinkPayAction
} from '../../../../actions/admin/account/linkPay';
import { AccountLinkPay } from '../../../../types/admin/account/linkPay';
import { Paginator } from '../../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../../types/api';
import { Alert as IAlert } from '../../../../types/alert';

import { typeOfTransaction } from '../../../../helpers/utils';
import { amountFormat } from '../../../../helpers/number';

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: AccountLinkPay | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

const DetailAccount = (props: {
    data: AccountLinkPay | null
}) => {
    if (props.data) {
        return (
            <Table className="align-items-center table-flush" responsive>
                <tbody>
                    <tr>
                        <td>Nama</td>
                        <td>{props.data.name}</td>
                    </tr>
                    <tr>
                        <td>Jumlah</td>
                        <td>{props.data.balance}</td>
                    </tr>
                    <tr>
                        <td>Kode</td>
                        <td>{props.data.code}</td>
                    </tr>
                    <tr>
                        <td>Tipe</td>
                        <td>{props.data.type}</td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return (
        <div>Data Tidak Ditemukan</div>
    )
}

class Detail extends Component<Props, State> {

    state = {
        data: null,
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findAccountLinkPayAction(id)
                .then((response: ApiResponse<AccountLinkPay>) => {

                    const data: AccountLinkPay = response.response!.result;

                    this.setState({
                        data: data,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<AccountLinkPay>) => {
                    this.setState({
                        loadedMessage: response.error!.metaData.message
                    })
                })
    }

    setAlertMessage = (message: string) => {
        this.setState({
            alert_message: message
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    render() {

        const showAlertError = (
            <Alert color="danger" isOpen={this.state.alert_visible} toggle={() => this.setAlertOpen(false)} fade={false}>
                <ul>
                    <li>{this.state.alert_message}</li>
                </ul>
            </Alert>
        )

        return (
            <>
                <HeaderView />

                <Container className="mt--7" fluid>
                <Row>
                        <div className="col">
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <Row className="align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Detail Account Link Pay</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {showAlertError}
                                    {this.state.isLoaded && this.state.data ? 
                                        (
                                          <DetailAccount data={this.state.data} />
                                        ) : this.state.loadedMessage
                                    }
                                </CardBody>
                                
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

type LinkStateToProps = {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
    }
}

type LinkDispatchToProps = {
    findAccountLinkPayAction: (id: number) => Promise<ApiResponse<AccountLinkPay>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findAccountLinkPayAction: (id: number) => dispatch(findAccountLinkPayAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Account Link Pay")
                    )
                );