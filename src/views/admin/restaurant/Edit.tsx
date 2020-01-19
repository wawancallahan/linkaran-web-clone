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
import { Restaurant, FormField } from '../../../types/admin/restaurant';
import {
    findRestaurantAction
} from '../../../actions/admin/restaurant';

import FormRestaurant from './FormEdit';
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
            address: '',
            point: {
                lat: '',
                lng: ''
            },
            rating: 0,
            photo: null,
            photo_preview: '',
            openTime: undefined,
            closeTime: undefined
        },
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findRestaurantAction(id)
                .then((response: ApiResponse<Restaurant>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: Restaurant =response.response!.result;
                    
                    const [openTimeHours, openTimeMinutes, openTimeSecond] = data.openTime.split(":")

                    const openTime = new Date();
                    openTime.setHours(Number.parseInt(openTimeHours))
                    openTime.setMinutes(Number.parseInt(openTimeMinutes))

                    const [closeTimeHours, closeTimeMinutes, closeTimeSecond] = data.closeTime.split(":")

                    const closeTime = new Date();
                    closeTime.setHours(Number.parseInt(closeTimeHours))
                    closeTime.setMinutes(Number.parseInt(closeTimeMinutes))

                    form.name = data.name;
                    form.address = data.address ? data.address : '';
                    form.point = {
                        lat: data.point.lat,
                        lng: data.point.lng
                    }
                    form.rating = data.rating;
                    form.openTime = openTime;
                    form.closeTime = closeTime;
                    form.photo_preview = data.image ? data.image : '';

                    this.setState({
                        form: form,
                        isLoaded: true
                    });
                    
                })
                .catch((response: ApiResponse<Restaurant>) => {
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
        this.props.history.push('/admin/restaurant');
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
                                    <h3 className="mb-0">Edit Restaurant</h3>
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {showAlertError}
                            {this.state.isLoaded ? 
                                (
                                    <FormRestaurant form={this.state.form} 
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
    findRestaurantAction: (id: number) => Promise<ApiResponse<Restaurant>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findRestaurantAction: (id: number) => dispatch(findRestaurantAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Edit Restaurant")
    )
);