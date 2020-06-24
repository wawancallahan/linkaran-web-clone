import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, ManualTopUpShow } from '../../../../types/admin/manualTopup';
import {
    findManualTopUpAction
} from '../../../../actions/admin/manualTopup';
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
        amount: '',
        driverProfile: {
            label: '',
            value: 0
        },
        bank: {
            label: '',
            value: 0
        },
        image: null,
        image_preview: ''
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findManualTopUpAction(id)
                .then((response: ApiResponse<ManualTopUpShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: ManualTopUpShow = response.response!.result;
                    form.amount = data.request && data.request.uniqueCodeWithAmount ? data.request.uniqueCodeWithAmount.toString() : '';

                    if (data.request && data.request.driverProfile && data.request.driverProfile.user) {
                        form.driverProfile = {
                            label: `${(data.request.driverProfile.user.phoneNumber || '')} - ${(data.request.driverProfile.user.name || '')}`,
                            value: data.request.driverProfile.id || 0
                        }
                    }

                    if (data.request && data.request.bank) {
                        form.bank = {
                            label: data.request.bank.nama || '',
                            value: data.request.bank.id || 0
                        }
                    }

                    form.image_preview = data.evidance || ''

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<ManualTopUpShow>) => {
                    setLoadMessage(response.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/manual-topup');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Manual Top Up</h3>
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

type LinkDispatchToProps = {
    findManualTopUpAction: (id: number) => Promise<ApiResponse<ManualTopUpShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findManualTopUpAction: (id: number) => dispatch(findManualTopUpAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Manual Top Up")