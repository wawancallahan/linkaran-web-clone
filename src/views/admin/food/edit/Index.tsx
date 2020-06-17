import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, FoodShow } from '../../../../types/admin/food';
import {
    findFoodAction
} from '../../../../actions/admin/food';
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
        price: 0,
        description: '',
        rating: 0,
        image: null,
        image_preview: '',
        foodCategory: {
            value: 0,
            label: ''
        },
        restaurant: {
            value: 0,
            label: ''
        },
        status: {
            value: '',
            label: ''
        }
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findFoodAction(id)
                .then((response: ApiResponse<FoodShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: FoodShow = response.response!.result;

                    form.name = data.name;
                    form.description = data.description;

                    if (data.foodCategory) {
                        form.foodCategory = {
                            label: data.foodCategory.name ? data.foodCategory.name : '',
                            value: data.foodCategory.id ? data.foodCategory.id : 0
                        }
                    }
                    
                    form.price = data.price;
                    form.rating = data.rating;

                    if (data.restaurant) {
                        form.restaurant = {
                            value: data.restaurant.id ? data.restaurant.id : 0,
                            label: data.restaurant.name ? data.restaurant.name : ''
                        }
                    }

                    form.status = {
                        value: data.status,
                        label: data.status
                    }

                    form.image_preview = data.image ? data.image : '';

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<FoodShow>) => {
                    setLoadMessage(response.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/food');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Makanan</h3>
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
    findFoodAction: (id: number) => Promise<ApiResponse<FoodShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findFoodAction: (id: number) => dispatch(findFoodAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Makanan")