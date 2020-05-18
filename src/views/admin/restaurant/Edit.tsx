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
import { Restaurant, FormField, RestaurantShow, OperatingTime as OperatingTimeInterface } from '../../../types/admin/restaurant';
import {
    findRestaurantAction
} from '../../../actions/admin/restaurant';

import FormRestaurant from './FormEdit';
import { ApiResponse } from '../../../types/api';
import { midnightDate } from '../../../helpers/utils';

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
        isLoaded: false,
        loadedMessage: '',
        alert_visible: false,
        alert_message: ''
    }

    findOperatingTime = (operatingTime: Partial<OperatingTimeInterface>[], day: number) => {
        const operatingTimeSelected : Partial<OperatingTimeInterface> | undefined = operatingTime.find((item: Partial<OperatingTimeInterface>) => item.day === day)

        return operatingTimeSelected
    }

    getTimeParse = (time: string | undefined) => {
        if (time) {
            const [timeParseHours, timeParseMinutes, timeParseSecond] = time.split(":")

            return `${timeParseHours}:${timeParseMinutes}`;
        }

        return "00:00"
    }

    componentDidMount() {
        const id = +this.props.match.params.id;

        this.props.findRestaurantAction(id)
                .then((response: ApiResponse<RestaurantShow>) => {
                    const form: FormField = {
                        ...this.state.form
                    }

                    const data: RestaurantShow = response.response!.result;

                    form.name = data.name;
                    form.address = data.address ? data.address : '';
                    form.point = {
                        lat: data.point.lat,
                        lng: data.point.lng
                    }
                    form.rating = data.rating;
                    form.photo_preview = data.image ? data.image : '';
                    form.phoneNumber = data.phoneNumber ? data.phoneNumber : '';;

                    if (data.district) {
                        if (data.district.province) {
                            form.province = {
                                value: data.district.province.id ? data.district.province.id : 0,
                                label: data.district.province.name ? data.district.province.name : ''
                            }

                            form.district = {
                                value: data.district.id ? data.district.id : 0,
                                label: data.district.name ? data.district.name : ''
                            }
                        }
                    }

                    if (data.operatingTime) {
                        const operatingTime: Partial<OperatingTimeInterface>[] = data.operatingTime
                        const operatingTimeMonday = this.findOperatingTime(operatingTime, 1)
                        const operatingTimeTuesday = this.findOperatingTime(operatingTime, 2)
                        const operatingTimeWednesday = this.findOperatingTime(operatingTime, 3)
                        const operatingTimeThursday = this.findOperatingTime(operatingTime, 4)
                        const operatingTimeFriday = this.findOperatingTime(operatingTime, 5)
                        const operatingTimeSaturday = this.findOperatingTime(operatingTime, 6)
                        const operatingTimeSunday = this.findOperatingTime(operatingTime, 7)

                        if (operatingTimeMonday) {
                            form.monday_start = this.getTimeParse(operatingTimeMonday.openTime)
                            form.monday_end = this.getTimeParse(operatingTimeMonday.closeTime)
                            form.monday_isClosed = operatingTimeMonday.isClosed ? operatingTimeMonday.isClosed : false
                        }

                        if (operatingTimeTuesday) {
                            form.tuesday_start = this.getTimeParse(operatingTimeTuesday.openTime)
                            form.tuesday_end = this.getTimeParse(operatingTimeTuesday.closeTime)
                            form.tuesday_isClosed = operatingTimeTuesday.isClosed ? operatingTimeTuesday.isClosed : false
                        }

                        if (operatingTimeWednesday) {
                            form.wednesday_start = this.getTimeParse(operatingTimeWednesday.openTime)
                            form.wednesday_end = this.getTimeParse(operatingTimeWednesday.closeTime)
                            form.wednesday_isClosed = operatingTimeWednesday.isClosed ? operatingTimeWednesday.isClosed : false
                        }

                        if (operatingTimeThursday) {
                            form.thursday_start = this.getTimeParse(operatingTimeThursday.openTime)
                            form.thursday_end = this.getTimeParse(operatingTimeThursday.closeTime)
                            form.thursday_isClosed = operatingTimeThursday.isClosed ? operatingTimeThursday.isClosed : false
                        }

                        if (operatingTimeFriday) {
                            form.friday_start = this.getTimeParse(operatingTimeFriday.openTime)
                            form.friday_end = this.getTimeParse(operatingTimeFriday.closeTime)
                            form.friday_isClosed = operatingTimeFriday.isClosed ? operatingTimeFriday.isClosed : false
                        }

                        if (operatingTimeSaturday) {
                            form.saturday_start = this.getTimeParse(operatingTimeSaturday.openTime)
                            form.saturday_end = this.getTimeParse(operatingTimeSaturday.closeTime)
                            form.saturday_isClosed = operatingTimeSaturday.isClosed ? operatingTimeSaturday.isClosed : false
                        }

                        if (operatingTimeSunday) {
                            form.sunday_start = this.getTimeParse(operatingTimeSunday.openTime)
                            form.sunday_end = this.getTimeParse(operatingTimeSunday.closeTime)
                            form.sunday_isClosed = operatingTimeSunday.isClosed ? operatingTimeSunday.isClosed : false
                        }
                    }

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
    findRestaurantAction: (id: number) => Promise<ApiResponse<RestaurantShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: EditProps) => {
    return {
        findRestaurantAction: (id: number) => dispatch(findRestaurantAction(id))
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        withTitle(Edit, "Edit Restoran")
    )
);