import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, PartnerShow } from '../../../../types/admin/partner';
import {
    findPartnerAction
} from '../../../../actions/admin/partner';
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
        email: '',
        phoneNumber: '',
        companyName: '',
        secret: '',
        startWorkingTogether: null,
        endWorkingTogether: null,
        ips: []
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findPartnerAction(id)
                .then((response: ApiResponse<PartnerShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: PartnerShow = response.response!.result;

                    form.name = data.user.name ? data.user.name : ''
                    form.email = data.user.email ? data.user.email : ''
                    form.phoneNumber = data.user.phoneNumber ? data.user.phoneNumber : ''
                    form.companyName = data.companyName
                    form.startWorkingTogether = new Date(data.startWorkingTogether)
                    form.endWorkingTogether = new Date(data.endWorkingTogether)
                    form.ips = data.ips

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<PartnerShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/partner');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Partner</h3>
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
    findPartnerAction: (id: number) => Promise<ApiResponse<PartnerShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findPartnerAction: (id: number) => dispatch(findPartnerAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Partner")