import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, UserShow } from '../../../../types/admin/user';
import {
    findUserAction
} from '../../../../actions/admin/user';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import { Role } from '../../../../types/admin/role';
import WithTitle from '../../../../hoc/WithTitle';
import { AppState } from '../../../../reducers';

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
        phoneNumber: '',
        email: '',
        roles: [],
        telegramuser: ''
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findUserAction(id)
                .then((response: ApiResponse<UserShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: UserShow = response.response!.result;

                    form.email =  data.email ? data.email : '';
                    form.name = data.name;
                    form.phoneNumber = data.phoneNumber;
                    form.telegramuser = data.telegramuser ? data.telegramuser : '';
                    
                    if (data.roles) {
                        form.roles = data.roles.map((value: Role) => {
                            return {
                                value: value.id,
                                label: value.title
                            };
                        })
                    }

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<UserShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/user');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit User</h3>
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
    findUserAction: (id: number) => dispatch(findUserAction(id))
});

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit User")