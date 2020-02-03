import React, { Component } from 'react';
import withTitle from '../../../hoc/WithTitle';
import HeaderView from "../../../components/Headers/HeaderView";

import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    Button,
    CardBody,
    CardFooter,
    Form,
    FormGroup,
    Input,
    Label,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { VoucherPromo, FormField } from '../../../types/admin/voucherPromo';

import FormVoucher from './FormEdit';
import { findVoucherPromoAction } from '../../../actions/admin/voucherPromo';
import { ApiResponse } from '../../../types/api';
import { Service } from '../../../types/admin/service';

type EditProps = RouteComponentProps<{
    id: string
}> & {

}

type Props = EditProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormField,
    isLoaded: boolean,
    loadedMessage: string,
    alert_visible: boolean,
    alert_message: string
}

class Edit extends Component<Props, State> {

    state = {
        form: {
            name: '',
            code: '',
            amount: '',
            quota: '',
            minimumPurchase: '',
            isLimited: '0',
            quantity: '',
            description: '',
            service: [],
            type: {
                value: 0,
                label: ''
            },
            startDateTime: null,
            endDateTime: null,
            image: null,
            image_preview: ''
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;
        
        this.props.findVoucherPromoAction(id)
                .then((response: ApiResponse<VoucherPromo>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: VoucherPromo =response.response!.result;

                    form.amount = data.amount.toString()
                    form.code = data.code
                    form.description = data.description
                    form.endDateTime = new Date(data.endDateTime)
                    form.image_preview = data.image ? data.image : ''
                    form.isLimited = data.isLimited ? '1' : '0'
                    form.minimumPurchase = data.minimumPurchase.toString()
                    form.name = data.name
                    form.quantity = data.quantity.toString()
                    form.quota = data.quota.toString()
                    form.service = data.service.map((value: Service, index: number) => {
                        return {
                            label: value.name,
                            value: value.id
                        }
                    })

                    form.startDateTime = new Date(data.startDateTime)
                    form.type = {
                        label: data.type.name,
                        value: data.type.id
                    }

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<VoucherPromo>) => {
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

    redirectOnSuccess = () => {
        this.props.history.push('/admin/voucher-promo');
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
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col>
                                    <h3 className="mb-0">Edit Voucher Promo</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                        {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormVoucher form={this.state.form} 
                                          setAlertMessage={this.setAlertMessage}
                                          setAlertOpen={this.setAlertOpen}
                                          redirectOnSuccess={this.redirectOnSuccess}
                                          id={+this.props.match.params.id}
                                            />
                                ) : this.state.loadedMessage
                            }
                        </CardBody>
                    </Card>
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
    findVoucherPromoAction: (id: number) => Promise<ApiResponse<VoucherPromo>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findVoucherPromoAction: (id: number) => dispatch(findVoucherPromoAction(id))
    }
}


export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Voucher Promo")
    )
);