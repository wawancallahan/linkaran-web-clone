import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, ManualWithDrawShow } from '../../../../types/admin/manualWithdraw';
import {
    findManualWithDrawAction
} from '../../../../actions/admin/manualWithdraw';
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
        bankName: '',
        accountNumber: '',
        accountName: ''
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findManualWithDrawAction(id)
                .then((response: ApiResponse<ManualWithDrawShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: ManualWithDrawShow = response.response!.result;

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

                    form.accountName = data.request && data.request.accountName ? data.request.accountName : '';
                    form.accountNumber = data.request && data.request.accountNumber ? data.request.accountNumber : '';

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<ManualWithDrawShow>) => {
                    setLoadMessage(response.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/manual-withdraw');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Manual Penaikan</h3>
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
    findManualWithDrawAction: (id: number) => Promise<ApiResponse<ManualWithDrawShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findManualWithDrawAction: (id: number) => dispatch(findManualWithDrawAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Manual Penaikan")