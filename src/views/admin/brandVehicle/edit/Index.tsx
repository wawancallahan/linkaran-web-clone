import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, BrandVehicleShow } from '../../../../types/admin/brandVehicle';
import {
    findBrandVehicleAction
} from '../../../../actions/admin/brandVehicle';
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
        name: ''
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findBrandVehicleAction(id)
                .then((response: ApiResponse<BrandVehicleShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: BrandVehicleShow = response.response!.result;

                    form.name = data.name;

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<BrandVehicleShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/brand-vehicle');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Model Kendaraan</h3>
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
    findBrandVehicleAction: (id: number) => Promise<ApiResponse<BrandVehicleShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findBrandVehicleAction: (id: number) => dispatch(findBrandVehicleAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Model Kendaraan")