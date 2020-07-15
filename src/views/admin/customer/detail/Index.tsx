import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { CustomerShow } from '../../../../types/admin/customer';
import {
    findCustomerAction
} from '../../../../actions/admin/customer';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';
import Profile from './components/Profile'
import Transaction from './components/Transaction'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<CustomerShow | null>(null)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findCustomerAction(id)
                .then((response: ApiResponse<CustomerShow>) => {

                    const data: CustomerShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<CustomerShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Detail Customer</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {loaded ? (
                            <Row>
                                <Col md={5}>
                                    <Profile data={item} />
                                </Col>
                                <Col md={7}>
                                    <Transaction data={item} />
                                </Col>
                            </Row>
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findCustomerAction: (id: number) => Promise<ApiResponse<CustomerShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findCustomerAction: (id: number) => dispatch(findCustomerAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Customer")