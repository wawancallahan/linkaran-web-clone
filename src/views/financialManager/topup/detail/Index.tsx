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
import { TopUpShow } from '../../../../types/financialManager/topup';
import { findTopUpAction } from '../../../../actions/financialManager/topup';
import Transfer from './components/Transfer'
import Profile from './components/Profile'
import Bank from './components/Bank'
import Approve from './components/Approve'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps  & LinkDispatchToProps;

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<TopUpShow | null>(null)
    const [needReload, setNeedReload] = React.useState(false)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id);

        const find = async () => {
            await props.findTopUpAction(id)
                .then((response: ApiResponse<TopUpShow>) => {

                    const data: TopUpShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<TopUpShow>) => {
                    setLoadMessage(error.error!.metaData.message)
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
                            <Transfer data={item} />
                            <Profile data={item} />
                        </Col>
                        <Col>
                            {needApprove ? (
                                <Approve data={item} setNeedReload={setNeedReload} setLoaded={setLoaded} />
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
    findTopUpAction: (id: number) => Promise<ApiResponse<TopUpShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        findTopUpAction: (id: number) => dispatch(findTopUpAction(id))
    }
}

export default withTitle(
    withRouter(connect(null, mapDispatchToProps)(Index)),
"Detail Top Up")