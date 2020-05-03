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
import { ManualWithDrawShow, FormField } from '../../../types/admin/manualWithdraw';
import {
    findManualWithDrawAction
} from '../../../actions/admin/manualWithdraw';

import FormManualWithDraw from './FormEdit';
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
            accountNumber: '',
            accountName: ''
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findManualWithDrawAction(id)
                .then((response: ApiResponse<ManualWithDrawShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: ManualWithDrawShow =response.response!.result;

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

                    form.accountName = data.request ? data.request.accountName : '';
                    form.accountNumber = data.request ? data.request.accountNumber : '';

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<ManualWithDrawShow>) => {
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
        this.props.history.push('/admin/manual-withdraw');
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
                                    <h3 className="mb-0">Edit Manual Penarikan</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormManualWithDraw form={this.state.form} 
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
    findManualWithDrawAction: (id: number) => Promise<ApiResponse<ManualWithDrawShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findManualWithDrawAction: (id: number) => dispatch(findManualWithDrawAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Manual Penarikan")
    )
);