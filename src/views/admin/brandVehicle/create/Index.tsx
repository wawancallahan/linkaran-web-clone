import * as React from 'react'
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField } from '../../../../types/admin/brandVehicle';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = {}

type Props = OwnProps

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [formField, setFormField] = React.useState<FormField>({
        name: '',
    })

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Tambah Model Kendaraan</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <Flash alertMessage={alertMessage} alertVisible={alertVisible} setAlertVisible={setAlertVisible}/>
                        <Form form={formField} 
                            setAlertVisible={setAlertVisible} 
                            setAlertMessage={setAlertMessage} />
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default WithTitle(
    Index
, "Tambah Model Kendaraan")