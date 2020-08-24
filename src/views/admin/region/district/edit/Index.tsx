import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, DistrictShow } from '../../../../../types/admin/region/district';
import {
    findDistrictAction
} from '../../../../../actions/admin/region/district';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../../types/api';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import { AppState } from '../../../../../reducers';

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
        name: '',
        alternativeName: '',
        province: {
            label: '',
            value: 0
        }
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findDistrictAction(id)
                .then((response: ApiResponse<DistrictShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: DistrictShow = response.response!.result;

                    form.name = data.name;
                    form.alternativeName = data.alternativeName;
                    if (data.province) {
                        form.province = {
                            label: data.province.name ? data.province.name : '',
                            value: data.province.id ? data.province.id : 0
                        }
                    }

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<DistrictShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/region/district');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Kabupaten/ Kota</h3>
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
    findDistrictAction: (id: number) => dispatch(findDistrictAction(id))
});

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Kabupaten/ Kota")