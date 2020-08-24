import * as React from 'react'
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField } from '../../../../types/admin/bank';
import WithTitle from '../../../../hoc/WithTitle';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../reducers';
import { AppActions } from '../../../../types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [alertMessage, setAlertMessage] = React.useState('')
    const [alertVisible, setAlertVisible] = React.useState(false)
    const [formField, setFormField] = React.useState<FormField>({
        nama: '',
        bankName: '',
        accountName: '',
        accountNumber: ''
    })

    const redirectOnSuccess = () => {
        props.push('/admin/bank');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Tambah Bank</h3>
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

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    push: push
});

export default WithTitle(
    connect(null, mapDispatchToProps)(Index)
, "Tambah Bank")