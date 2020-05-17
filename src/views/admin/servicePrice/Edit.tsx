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
import { ServicePriceShow, FormField } from '../../../types/admin/servicePrice';

import FormServicePrice from './FormEdit';
import { ApiResponse } from '../../../types/api';
import { findServicePriceAction } from '../../../actions/admin/servicePrice';

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
            price: {
                value: 0,
                label: ''
            },
            district: {
                value: 0,
                label: ''
            },
            service: {
                value: 0,
                label: ''
            },
            vehicleType: {
                value: 0,
                label: ''
            },
            driverPaymentDeductions: "",
            servicePaymentDeductions: "",
            maxDriverDistanceRadius: ""
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findServicePriceAction(id)
                .then((response: ApiResponse<ServicePriceShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: ServicePriceShow = response.response!.result;

                    if (data.priceId && data.basePrice) {
                        form.price = {
                            value: data.priceId,
                            label: data.basePrice.toString()
                        }
                    }

                    if (data.district) {
                        form.district = {
                            value: data.district.id ? data.district.id : 0,
                            label: data.district.name ? data.district.name : ''
                        }
                    }

                    if (data.service) {
                        form.service = {
                            value: data.service.id ? data.service.id : 0,
                            label: data.service.name ? data.service.name : ''
                        }
                    }

                    if (data.vehicleType) {
                        form.vehicleType = {
                            value: data.vehicleType.id ? data.vehicleType.id : 0,
                            label: data.vehicleType.name ? data.vehicleType.name : ''
                        }
                    }

                    if (data.driverPaymentDeductions) {
                        form.driverPaymentDeductions = data.driverPaymentDeductions.toString()
                    }

                    if (data.servicePaymentDeductions) {
                        form.servicePaymentDeductions = data.servicePaymentDeductions.toString()
                    }

                    if (data.maxDriverDistanceRadius) {
                        form.maxDriverDistanceRadius = data.maxDriverDistanceRadius.toString()
                    }

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<ServicePriceShow>) => {

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

    redirectOnSuccess = () => {
        this.props.history.push('/admin/service-price');
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
                                    <h3 className="mb-0">Edit Harga Layanan</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormServicePrice form={this.state.form} 
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
    findServicePriceAction: (id: number) => Promise<ApiResponse<ServicePriceShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findServicePriceAction: (id: number) => dispatch(findServicePriceAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Harga Layanan")
    )
);