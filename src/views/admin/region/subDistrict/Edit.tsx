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
import { SubDistrictShow, FormField } from '../../../../types/admin/region/subDistrict';
import {
    findSubDistrictAction
} from '../../../../actions/admin/region/subDistrict';

import FormSubDistrict from './FormEdit';
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
            district: {
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

        this.props.findSubDistrictAction(id)
                .then((response: ApiResponse<SubDistrictShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: SubDistrictShow = response.response!.result;

                    form.name = data.name;
                    if (data.district) {
                        form.district = {
                            label: data.district.name ? data.district.name : '',
                            value: data.district.id ? data.district.id : 0
                        }
                    }
                    
                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                })
                .catch((error: ApiResponse<SubDistrictShow>) => {
                    
                    let message = "Gagal Mendapatkan Response"

                    if (error.error) {
                        message = error.error.metaData.message
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
        this.props.history.push('/admin/region/sub-district');
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
                                    <h3 className="mb-0">Edit Kecamatan</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormSubDistrict form={this.state.form} 
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
    findSubDistrictAction: (id: number) => Promise<ApiResponse<SubDistrictShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findSubDistrictAction: (id: number) => dispatch(findSubDistrictAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Edit Kecamatan")
    )
);