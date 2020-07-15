import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { DriverShow } from '../../../../types/admin/driver';
import {
    findDriverAction
} from '../../../../actions/admin/driver';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';
import Profile from './components/Profile'
import Rating from './components/Rating'
import Kendaraan from './components/Kendaraan'
import Keterangan from './components/Keterangan'
import Transaction from './components/Transaction'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<DriverShow | null>(null)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findDriverAction(id)
                .then((response: ApiResponse<DriverShow>) => {

                    const data: DriverShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<DriverShow>) => {
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
                                <h3 className="mb-0">Detail Driver</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {loaded ? (
                            <Row>
                                <Col md={5}>
                                    <Profile data={item} />
                                    <Kendaraan data={item} />
                                </Col>
                                <Col md={7}>
                                    <Transaction data={item} />
                                    <Rating data={item} />
                                    <Keterangan data={item} />
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
    findDriverAction: (id: number) => Promise<ApiResponse<DriverShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findDriverAction: (id: number) => dispatch(findDriverAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Driver")