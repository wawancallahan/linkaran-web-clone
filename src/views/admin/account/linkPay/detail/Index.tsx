import * as React from 'react'
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
import { AppState } from '../../../../../reducers';
import { createMatchSelector, RouterRootState } from 'connected-react-router';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<AccountLinkPayShow | null>(null)

    React.useEffect(() => {
        if (props.match) {
            const id = Number.parseInt(props.match.params.id)

            const find = async () => {
                await props.findAccountLinkPayAction(id)
                    .then((response: ApiResponse<AccountLinkPayShow>) => {

                        const data: AccountLinkPayShow = response.response!.result;

                        setItem(data)
                        setLoaded(true)
                    })
                    .catch((error: ApiResponse<AccountLinkPayShow>) => {
                        setLoadMessage(error.error!.metaData.message)
                    })
            }

            find()     
        } else {
            setLoadMessage("Data Tidak Ditemukan");
        }
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

const mapStateToProps = (state: AppState) => {
    const matchSelector = createMatchSelector<RouterRootState<any>, { id: string }>("/admin/account/link-pay/:id");
    return {
        match: matchSelector(state)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    findAccountLinkPayAction: (id: number) => dispatch(findAccountLinkPayAction(id))
})

export default WithTitle(
    connect(mapStateToProps, mapDispatchToProps)(Index)
, "Detail Akun Link Pay")