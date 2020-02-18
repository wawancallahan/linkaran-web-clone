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
    findLinkPayAction
} from '../../../../actions/admin/transaction/linkPay';
import { LinkPay } from '../../../../types/admin/transaction/linkPay';
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
    data: LinkPay | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

const DetailTransaksi = (props: {
    data: LinkPay | null
}) => {
    if (props.data) {
        return (
            <Table className="align-items-center table-flush" responsive>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        )
    }

    return null
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

        this.props.findLinkPayAction(id)
                .then((response: ApiResponse<LinkPay>) => {

                    const data: LinkPay = response.response!.result;

                    this.setState({
                        data: data,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<LinkPay>) => {
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
                                            <h3 className="mb-0">Detail Transaksi Link Pay</h3>
                                        </div>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    {showAlertError}
                                    {this.state.isLoaded && this.state.data ? 
                                        (
                                          <DetailTransaksi data={this.state.data} />
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

interface LinkStateToProps {
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
    }
}

interface LinkDispatchToProps {
    findLinkPayAction: (id: number) => Promise<ApiResponse<LinkPay>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findLinkPayAction: (id: number) => dispatch(findLinkPayAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Transaksi Link Pay")
                    )
                );