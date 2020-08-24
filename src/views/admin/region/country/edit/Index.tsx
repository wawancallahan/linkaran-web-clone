import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, CountryShow } from '../../../../../types/admin/region/country';
import {
    findCountryAction
} from '../../../../../actions/admin/region/country';
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
        name: ''
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findCountryAction(id)
                .then((response: ApiResponse<CountryShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: CountryShow = response.response!.result;

                    form.name = data.name;

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<CountryShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/region/country');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Negara</h3>
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
    findCountryAction: (id: number) => dispatch(findCountryAction(id))
});

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Negara")