import React, { Component } from 'react';
import withTitle from '../../../hoc/WithTitle';

import HeaderView from "../../../components/Headers/HeaderView";
import {
    Container,
    Row,
    Col,
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
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import { AxiosResponse } from 'axios';

import Pagination from '../../../components/Pagination/Pagination';
import queryString from 'query-string';
import {
    findVoucherPromoAction
} from '../../../actions/admin/voucherPromo';
import { VoucherPromo } from '../../../types/admin/voucherPromo';
import { Paginator } from '../../../types/paginator';
import { ApiResponse, ApiResponseSuccess, ApiResponseError, ApiResponseList } from '../../../types/api';
import { Alert as IAlert } from '../../../types/alert';

import DetailVoucher from './DetailVoucher'
import DetailPengunaanVoucher from './DetailPengunaanVoucher'
import DetailJumlahPenggunaanVoucher from './DetailJumlahPenggunaanVoucher'
import DetailJumlahPenggunaanTicket from './DetailJumlahPenggunaanTicket'

type DetailProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = DetailProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    data: VoucherPromo | null,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
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
        
        this.props.findVoucherPromoAction(id)
                .then((response: ApiResponse<VoucherPromo>) => {    
                    if (response.response) {
                            const data: VoucherPromo = response.response.result;

                        this.setState({
                            data: data,
                            isLoaded: true
                        });
                    } else {
                        this.setState({
                            isLoaded: false
                        });
                    }
                })
                .catch((response: ApiResponse<VoucherPromo>) => {

                    let message = "Gagal Mendapatkan Response";

                    if (response.error) {
                        message = response.error.metaData.message;
                    }

                    this.setState({
                        loadedMessage: message
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
                    {showAlertError}
                    {this.state.isLoaded && this.state.data ? 
                        (
                            <>
                                <div className="mb-4">
                                    <DetailVoucher 
                                        voucher={this.state.data} 
                                        ticketState={false} 
                                        voucherState={true} />
                                </div>
                                <div className="mb-4">
                                    <Row>
                                        <Col>
                                            <DetailJumlahPenggunaanVoucher voucher={this.state.data} />
                                        </Col>
                                        <Col>
                                            <DetailJumlahPenggunaanTicket voucher={this.state.data}/>                              
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <DetailPengunaanVoucher data={this.state.data} />
                                </div>
                            </>
                        ) : this.state.loadedMessage
                    }
                    
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
    findVoucherPromoAction: (id: number) => Promise<ApiResponse<VoucherPromo>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: DetailProps): LinkDispatchToProps => {
    return {
        findVoucherPromoAction: (id: number) => dispatch(findVoucherPromoAction(id))
    }
}

export default  withRouter(
                    connect(mapStateToProps, mapDispatchToProps)(
                            withTitle(Detail, "Detail Voucher")
                    )
                );