import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, SubDistrictShow } from '../../../../../types/admin/region/subDistrict';
import {
    findSubDistrictAction
} from '../../../../../actions/admin/region/subDistrict';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../../types/api';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';

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
        district: {
            label: '',
            value: 0
        }
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findSubDistrictAction(id)
                .then((response: ApiResponse<SubDistrictShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: SubDistrictShow = response.response!.result;

                    form.name = data.name;
                    if (data.district) {
                        form.district = {
                            label: data.district.name ? data.district.name : '',
                            value: data.district.id ? data.district.id : 0
                        }
                    }

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<SubDistrictShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/region/sub-district');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Kecamatan</h3>
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
    findSubDistrictAction: (id: number) => Promise<ApiResponse<SubDistrictShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findSubDistrictAction: (id: number) => dispatch(findSubDistrictAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Kecamatan")