import * as React from 'react'
import withTitle from '../../../../hoc/WithTitle';
import { 
    Container, 
    Alert,
    Row,
    Col
 } from 'reactstrap'
import HeaderView from '../../../../components/Headers/HeaderView'
import {
    Link,
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import {
    connect
} from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../types';
import { ApiResponse } from '../../../../types/api';
import { WithDrawShow } from '../../../../types/financialManager/withdraw';
import { findWithDrawAction } from '../../../../actions/financialManager/withdraw';
import WithDraw from './components/WithDraw'
import Profile from './components/Profile'
import Bank from './components/Bank'
import Approval from './components/Approval'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps  & LinkDispatchToProps;

const Index: React.FC<Props> = (props) => {
    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<WithDrawShow | null>(null)
    const [needReload, setNeedReload] = React.useState(false)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id);

        const find = async () => {
            await props.findWithDrawAction(id)
                .then((response: ApiResponse<WithDrawShow>) => {

                    const data: WithDrawShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<WithDrawShow>) => {
                    setLoadMessage(response.error!.metaData.message)
                })
        }

        find()        
    }, [needReload])

    const needApprove = item && ! item.approvedBy
    
    return (
        <React.Fragment>
            <HeaderView />

            <Container className="mt--7" fluid>
                {loaded ? (
                    <Row>
                        <Col>
                            <WithDraw data={item} />
                            <Profile data={item} />
                        </Col>
                        <Col>
                            {needApprove ? (
                                <Approval data={item} setNeedReload={setNeedReload} setLoaded={setLoaded} />
                            ) : null}
                            <Bank data={item} />
                        </Col>
                    </Row>
                ) : loadMessage} 
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findWithDrawAction: (id: number) => Promise<ApiResponse<WithDrawShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        findWithDrawAction: (id: number) => dispatch(findWithDrawAction(id))
    }
}

export default withTitle(
    withRouter(connect(null, mapDispatchToProps)(Index)),
"Detail Penarikan")