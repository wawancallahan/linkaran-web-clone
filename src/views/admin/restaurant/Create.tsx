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

import FormRestaurant from './Form';
import { midnightDate } from '../../../helpers/utils';

type CreateProps = RouteComponentProps & {

}

type Props = CreateProps & LinkStateToProps & LinkDispatchToProps;

type State = {
    form: FormField,
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
            monday_start: '00:00',
            monday_end: '00:00',
            monday_isClosed: false,
            tuesday_start: '00:00',
            tuesday_end: '00:00',
            tuesday_isClosed: false,
            wednesday_start: '00:00',
            wednesday_end: '00:00',
            wednesday_isClosed: false,
            thursday_start: '00:00',
            thursday_end: '00:00',
            thursday_isClosed: false,
            friday_start: '00:00',
            friday_end: '00:00',
            friday_isClosed: false,
            saturday_start: '00:00',
            saturday_end: '00:00',
            saturday_isClosed: false,
            sunday_start: '00:00',
            sunday_end: '00:00',
            sunday_isClosed: false,
            district: {
                value: 0,
                label: ''
            },
            province: {
                value: 0,
                label: ''
            },
            phoneNumber: '',
            registered: '0'
        },
        alert_visible: false,
        alert_message: ''
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
                    {showAlertError}
                    <FormRestaurant form={this.state.form} 
                                    setAlertMessage={this.setAlertMessage}
                                    setAlertOpen={this.setAlertOpen}
                                    redirectOnSuccess={this.redirectOnSuccess}
                                    />
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

}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: CreateProps) => {
    return {

    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Create, "Tambah Restoran")
    )
);