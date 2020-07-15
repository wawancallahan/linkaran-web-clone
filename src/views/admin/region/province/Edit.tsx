import React, { Component } from 'react';
import withTitle from '../../../../hoc/WithTitle';
import HeaderView from "../../../../components/Headers/HeaderView";

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
import { AppState } from '../../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';
import { ProvinceShow, FormField } from '../../../../types/admin/region/province';
import {
    findProvinceAction
} from '../../../../actions/admin/region/province';

import FormProvince from './FormEdit';
import { ApiResponse } from '../../../../types/api';

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
            alternativeName: '',
            country: {
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

        this.props.findProvinceAction(id)
                .then((response: ApiResponse<ProvinceShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: ProvinceShow = response.response!.result;

                    form.name = data.name;
                    form.alternativeName = data.alternativeName;
                    if ( data.country) {
                        form.country = {
                            label: data.country.name ? data.country.name : '',
                            value: data.country.id ? data.country.id : 0
                        }
                    }

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                })
                .catch((error: ApiResponse<ProvinceShow>) => {
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
        this.props.history.push('/admin/region/province');
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
                                    <h3 className="mb-0">Edit Provinsi</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormProvince form={this.state.form} 
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
    findProvinceAction: (id: number) => Promise<ApiResponse<ProvinceShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findProvinceAction: (id: number) => dispatch(findProvinceAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Edit Provinsi")
    )
);