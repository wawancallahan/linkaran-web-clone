import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField } from '../../../../types/admin/servicePrice';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
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
                                <h3 className="mb-0">Tambah Harga Layanan</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                        <Form form={formField} 
                            setAlertVisible={setAlertVisible} 
                            setAlertMessage={setAlertMessage}
                            redirectOnSuccess={redirectOnSuccess} />
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default WithTitle(
    withRouter(Index)
, "Tambah Harga Layanan")