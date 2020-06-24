import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { ApplicationShow } from '../../../../../types/admin/transaction/application';
import {
    findApplicationAction
} from '../../../../../actions/admin/transaction/application';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../../types/api';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import Complete from './complete/Index'
import Inprogress from './inprogress/Index'

type OwnProps = RouteComponentProps<{
    type: string,
    numberTransaction: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<ApplicationShow | null>(null)
    const [typeTransaction, setTypeTransaction] = React.useState('complete')

    React.useEffect(() => {
        const type = props.match.params.type;
        const numberTransaction = props.match.params.numberTransaction

        const find = async () => {
            await props.findApplicationAction(type, numberTransaction)
                .then((response: ApiResponse<ApplicationShow>) => {

                    const data: ApplicationShow = response.response!.result;

                    setItem(data)
                    setTypeTransaction(type)
                    setLoaded(true)
                })
                .catch((response: ApiResponse<ApplicationShow>) => {
                    setLoadMessage(response.error!.metaData.message)
                })
        }

        find()        
    }, [])

    let detailTransaction: React.ReactChild = '';

    if (item) {
        switch (typeTransaction) {
            case "complete":
                detailTransaction = <Complete data={item} />
            break;
            case "inprogress":
                detailTransaction = <Inprogress data={item} />
            break;
        }
    }

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Detail Transaksi Aplikasi</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {loaded ? (
                            detailTransaction
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findApplicationAction: (type: string, numberTransaction: string) => Promise<ApiResponse<ApplicationShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        findApplicationAction: (type: string, numberTransaction: string) => dispatch(findApplicationAction(type, numberTransaction))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Transaksi Aplikasi")