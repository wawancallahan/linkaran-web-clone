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
import { SubBrandVehicle, FormField } from '../../../types/admin/subBrandVehicle';
import {
    findSubBrandVehicleAction
} from '../../../actions/admin/subBrandVehicle';

import FormSubBrandVehicle from './FormEdit';
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

class Create extends Component<Props, State> {

    state = {
        form: {
            name: '',
            brandVehicle: {
                label: '',
                value: 0
            }
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findSubBrandVehicleAction(id)
                .then((response: ApiResponse<SubBrandVehicle>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: SubBrandVehicle =response.response!.result;

                    form.name = data.name;
                    form.brandVehicle = {
                        value: data.brandVehicle.id,
                        label: data.brandVehicle.name
                    }

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<SubBrandVehicle>) => {
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
        this.props.history.push('/admin/sub-brand-vehicle');
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
                                    <h3 className="mb-0">Edit Sub Brand Vehicle</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormSubBrandVehicle form={this.state.form} 
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
    findSubBrandVehicleAction: (id: number) => Promise<ApiResponse<SubBrandVehicle>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findSubBrandVehicleAction: (id: number) => dispatch(findSubBrandVehicleAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Edit Sub Brand Vehicle")
    )
);