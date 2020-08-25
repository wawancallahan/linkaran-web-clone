import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, ServicePriceShow } from '../../../../types/admin/servicePrice';
import {
    findServicePriceAction
} from '../../../../actions/admin/servicePrice';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';
import { AppState } from '../../../../reducers';

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [formField, setFormField] = React.useState<FormField>({
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
        driverPaymentDeductions: "0",
        servicePaymentDeductions: "0",
        maxDriverDistanceRadius: "0"
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findServicePriceAction(id)
                .then((response: ApiResponse<ServicePriceShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: ServicePriceShow = response.response!.result;

                    if (data.priceId !== undefined && 
                        data.basePrice !== undefined && 
                        data.minKm !== undefined && 
                        data.pricePerKm !== undefined) {
                        form.price = {
                            value: data.priceId,
                            label: `Rp. ${data.basePrice}, Minimal ${data.minKm} Km dengan Rp. ${data.pricePerKm}/Km`
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

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<ServicePriceShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/service-price');
    }

    return (
        <React.Fragment>
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
                        <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                        {loaded ? (
                            <Form form={formField} 
                                setAlertVisible={setAlertVisible} 
                                setAlertMessage={setAlertMessage}
                                redirectOnSuccess={redirectOnSuccess} 
                                id={Number.parseInt(props.match.params.id)} />
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    findServicePriceAction: (id: number) => dispatch(findServicePriceAction(id))
});

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Harga Layanan")