import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/form/Index'
import { FormField } from '../../../../types/admin/restaurant';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [formField, setFormField] = React.useState<FormField>({
        name: '',
        address: '',
        point: '',
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
                                <h3 className="mb-0">Tambah Restoran</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                </Card>
                <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                <Form form={formField} 
                    setAlertVisible={setAlertVisible} 
                    setAlertMessage={setAlertMessage}
                    redirectOnSuccess={redirectOnSuccess} />
            </Container>
        </React.Fragment>
    )
}

export default WithTitle(
    withRouter(Index)
, "Tambah Restoran")