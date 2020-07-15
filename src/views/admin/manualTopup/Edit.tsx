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
import { ManualTopUpShow, FormField } from '../../../types/admin/manualTopup';
import {
    findManualTopUpAction
} from '../../../actions/admin/manualTopup';

import FormManualTopUp from './FormEdit';
import { ApiResponse } from '../../../types/api';

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
            amount: '',
            driverProfile: {
                label: '',
                value: 0
            },
            bank: {
                label: '',
                value: 0
            },
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

        this.props.findManualTopUpAction(id)
                .then((response: ApiResponse<ManualTopUpShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: ManualTopUpShow =response.response!.result;

                    form.amount = data.request && data.request.uniqueCodeWithAmount ? data.request.uniqueCodeWithAmount.toString() : '';

                    if (data.request && data.request.driverProfile && data.request.driverProfile.user) {
                        form.driverProfile = {
                            label: `${(data.request.driverProfile.user.phoneNumber || '')} - ${(data.request.driverProfile.user.name || '')}`,
                            value: data.request.driverProfile.id || 0
                        }
                    }

                    if (data.request && data.request.bank) {
                        form.bank = {
                            label: data.request.bank.nama || '',
                            value: data.request.bank.id || 0
                        }
                    }

                    form.image_preview = data.evidance || ''

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((error: ApiResponse<ManualTopUpShow>) => {
                    this.setState({
                        loadedMessage: error.error!.metaData.message
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
        this.props.history.push('/admin/manual-topup');
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
                                    <h3 className="mb-0">Edit Manual Top Up</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormManualTopUp form={this.state.form} 
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

type LinkStateToProps = {

}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {

    }
}

type LinkDispatchToProps = {
    findManualTopUpAction: (id: number) => Promise<ApiResponse<ManualTopUpShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findManualTopUpAction: (id: number) => dispatch(findManualTopUpAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Manual Top Up")
    )
);