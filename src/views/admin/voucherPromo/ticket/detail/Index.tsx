import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Row, Col } from 'reactstrap';
import { VoucherPromoShow } from '../../../../../types/admin/voucherPromo';
import {
    findVoucherPromoAction
} from '../../../../../actions/admin/voucherPromo';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../../types/api';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import Voucher from '../../detail/components/Voucher';
import JumlahPenggunaanVoucher from '../../detail/components/JumlahPenggunaanVoucher';
import JumlahPenggunaanTicket from '../../detail/components/JumlahPenggunaanTicket';
import TicketList from './components/list/Index'

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loaded, setLoaded] = React.useState(false)
    const [loadMessage, setLoadMessage] = React.useState('')
    const [item, setItem] = React.useState<VoucherPromoShow | null>(null)

    React.useEffect(() => {
        const id = Number.parseInt(props.match.params.id)

        const find = async () => {
            await props.findVoucherPromoAction(id)
                .then((response: ApiResponse<VoucherPromoShow>) => {

                    const data: VoucherPromoShow = response.response!.result;

                    setItem(data)
                    setLoaded(true)
                })
                .catch((error: ApiResponse<VoucherPromoShow>) => {
                    setLoadMessage(error.error!.metaData.message)
                })
        }

        find()        
    }, [])

    return (
        <React.Fragment>
            <HeaderView />
            <Container className="mt--7" fluid>
                {loaded ? (
                    <React.Fragment>
                        <div className="mb-4">
                            <Voucher 
                                data={item} 
                                isTicket={true} 
                                isVoucher={false} />
                        </div>
                        <div className="mb-4">
                            <Row>
                                <Col>
                                    <JumlahPenggunaanVoucher data={item} />
                                </Col>
                                <Col>
                                    <JumlahPenggunaanTicket data={item} />                              
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <TicketList data={item} />
                        </div>
                    </React.Fragment>
                ) : loadMessage }
            </Container>
        </React.Fragment>
    )
}

type LinkDispatchToProps = {
    findVoucherPromoAction: (id: number) => Promise<ApiResponse<VoucherPromoShow>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        findVoucherPromoAction: (id: number) => dispatch(findVoucherPromoAction(id))
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Tiket")