import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import Flash from './components/Flash'
import Form from './components/Form'
import { FormField, VoucherPromoShow } from '../../../../types/admin/voucherPromo';
import {
    findVoucherPromoAction
} from '../../../../actions/admin/voucherPromo';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';
import { Service } from '../../../../types/admin/service';
import { Restaurant } from '../../../../types/admin/restaurant';

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
        code: '',
        amount: '',
        quota: '',
        minimumPurchase: '',
        isLimited: '0',
        quantity: '',
        description: '',
        service: [],
        voucherType: {
            value: 0,
            label: ''
        },
        startDateTime: null,
        endDateTime: null,
        image: null,
        image_preview: '',
        isAutoSet: '0',
        restaurants: []
    })

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findVoucherPromoAction(id)
                .then((response: ApiResponse<VoucherPromoShow>) => {
                    const form: FormField = {
                        ...formField
                    }

                    const data: VoucherPromoShow = response.response!.result;

                    form.amount = data.amount.toString()
                    form.code = data.code
                    form.description = data.description ? data.description : ''
                    form.startDateTime = new Date(data.startDateTime)
                    form.endDateTime = new Date(data.endDateTime)
                    form.image_preview = data.image ? data.image : ''
                    form.isLimited = data.isLimited ? '1' : '0'
                    form.isAutoSet = data.isAutoSet ? '1' : '0'
                    form.minimumPurchase = data.minimumPurchase.toString()
                    form.name = data.name
                    form.quantity = data.quantity.toString()
                    form.quota = data.quota.toString()

                    if (data.service) {
                        form.service = data.service.map((value: Partial<Service>, index: number) => {
                            return {
                                label: value.name ? value.name : '',
                                value: value.id ? value.id : 0
                            }
                        })
                    }

                    if (data.restaurants) {
                        form.restaurants = data.restaurants.map((value: Partial<Restaurant>, index: number) => {
                            return {
                                label: value.name ? value.name : '',
                                value: value.id ? value.id : 0
                            }
                        })
                    }

                    if (data.type) {
                        form.voucherType = {
                            label: data.type.name ? data.type.name : '',
                            value: data.type.id ? data.type.id : 0
                        }
                    }

                    setFormField(form)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<VoucherPromoShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    const redirectOnSuccess = () => {
        props.history.push('/admin/voucher-promo');
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Edit Voucher</h3>
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
    findVoucherPromoAction: (id: number) => Promise<ApiResponse<VoucherPromoShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findVoucherPromoAction: (id: number) => dispatch(findVoucherPromoAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Edit Voucher")