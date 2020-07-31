import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/form/Index'
import { FormField, RestaurantShow, OperatingTime as OperatingTimeInterface } from '../../../../types/admin/restaurant';
import {
    findRestaurantAction
} from '../../../../actions/admin/restaurant';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [formField, setFormField] = React.useState<FormField>({
        name: '',
        address: '',
        point: "",
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
    })

    const findOperatingTime = (operatingTime: Partial<OperatingTimeInterface>[], day: number) => {
        const operatingTimeSelected : Partial<OperatingTimeInterface> | undefined = operatingTime.find((item: Partial<OperatingTimeInterface>) => item.day === day)

        return operatingTimeSelected
    }

    const getTimeParse = (time: string | undefined) => {
        if (time) {
            const [timeParseHours, timeParseMinutes, timeParseSecond] = time.split(":")

            return `${timeParseHours}:${timeParseMinutes}`;
        }

        return "00:00"
    }

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findRestaurantAction(id)
                .then((response: ApiResponse<RestaurantShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: RestaurantShow = response.response!.result;

                    form.name = data.name;
                    form.address = data.address ? data.address : '';
                    form.point = `${data.point.lat},${data.point.lng}`;
                    form.rating = data.rating;
                    form.photo_preview = data.image ? data.image : '';
                    form.phoneNumber = data.phoneNumber ? data.phoneNumber : '';

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
                        const operatingTimeMonday = findOperatingTime(operatingTime, 1)
                        const operatingTimeTuesday = findOperatingTime(operatingTime, 2)
                        const operatingTimeWednesday = findOperatingTime(operatingTime, 3)
                        const operatingTimeThursday = findOperatingTime(operatingTime, 4)
                        const operatingTimeFriday = findOperatingTime(operatingTime, 5)
                        const operatingTimeSaturday = findOperatingTime(operatingTime, 6)
                        const operatingTimeSunday = findOperatingTime(operatingTime, 7)

                        if (operatingTimeMonday) {
                            form.monday_start = getTimeParse(operatingTimeMonday.openTime)
                            form.monday_end = getTimeParse(operatingTimeMonday.closeTime)
                            form.monday_isClosed = operatingTimeMonday.isClosed ? operatingTimeMonday.isClosed : false
                        }

                        if (operatingTimeTuesday) {
                            form.tuesday_start = getTimeParse(operatingTimeTuesday.openTime)
                            form.tuesday_end = getTimeParse(operatingTimeTuesday.closeTime)
                            form.tuesday_isClosed = operatingTimeTuesday.isClosed ? operatingTimeTuesday.isClosed : false
                        }

                        if (operatingTimeWednesday) {
                            form.wednesday_start = getTimeParse(operatingTimeWednesday.openTime)
                            form.wednesday_end = getTimeParse(operatingTimeWednesday.closeTime)
                            form.wednesday_isClosed = operatingTimeWednesday.isClosed ? operatingTimeWednesday.isClosed : false
                        }

                        if (operatingTimeThursday) {
                            form.thursday_start = getTimeParse(operatingTimeThursday.openTime)
                            form.thursday_end = getTimeParse(operatingTimeThursday.closeTime)
                            form.thursday_isClosed = operatingTimeThursday.isClosed ? operatingTimeThursday.isClosed : false
                        }

                        if (operatingTimeFriday) {
                            form.friday_start = getTimeParse(operatingTimeFriday.openTime)
                            form.friday_end = getTimeParse(operatingTimeFriday.closeTime)
                            form.friday_isClosed = operatingTimeFriday.isClosed ? operatingTimeFriday.isClosed : false
                        }

                        if (operatingTimeSaturday) {
                            form.saturday_start = getTimeParse(operatingTimeSaturday.openTime)
                            form.saturday_end = getTimeParse(operatingTimeSaturday.closeTime)
                            form.saturday_isClosed = operatingTimeSaturday.isClosed ? operatingTimeSaturday.isClosed : false
                        }

                        if (operatingTimeSunday) {
                            form.sunday_start = getTimeParse(operatingTimeSunday.openTime)
                            form.sunday_end = getTimeParse(operatingTimeSunday.closeTime)
                            form.sunday_isClosed = operatingTimeSunday.isClosed ? operatingTimeSunday.isClosed : false
                        }
                    }

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<RestaurantShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/restaurant');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow mb-3">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Restoran</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                </Card>
                <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                {loaded ? (
                    <Form form={formField} 
                        setAlertVisible={setAlertVisible} 
                        setAlertMessage={setAlertMessage}
                        redirectOnSuccess={redirectOnSuccess} 
                        id={Number.parseInt(props.match.params.id)} />
                ) : loadMessage}
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findRestaurantAction: (id: number) => Promise<ApiResponse<RestaurantShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findRestaurantAction: (id: number) => dispatch(findRestaurantAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Restoran")