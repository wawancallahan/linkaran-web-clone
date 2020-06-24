import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { AccountLinkPayShow } from '../../../../../types/admin/account/linkPay';
import {
    findAccountLinkPayAction
} from '../../../../../actions/admin/account/linkPay';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../../types/api';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import Account from './components/Account'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<AccountLinkPayShow | null>(null)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findAccountLinkPayAction(id)
                .then((response: ApiResponse<AccountLinkPayShow>) => {

                    const data: AccountLinkPayShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<AccountLinkPayShow>) => {
                    setLoadMessage(response.error!.metaData.message)
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
                                <h3 className="mb-0">Detail Akun Link Pay</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {loaded ? (
                            <Account data={item} />
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findAccountLinkPayAction: (id: number) => Promise<ApiResponse<AccountLinkPayShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => {
    return {
        findAccountLinkPayAction: (id: number) => dispatch(findAccountLinkPayAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Akun Link Pay")