import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { VoucherPromoShow } from '../../../../types/admin/voucherPromo';
import {
    findVoucherPromoAction
} from '../../../../actions/admin/voucherPromo';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApiResponse } from '../../../../types/api';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';
import Voucher from './components/Voucher'
import JumlahPenggunaanVoucher from './components/JumlahPenggunaanVoucher'
import JumlahPenggunaanTicket from './components/JumlahPenggunaanTicket'
import RestaurantPromoList from './components/RestaurantPromoList'
import PenggunaanVoucher from './components/penggunaanVoucher/Index'
import { AppState } from '../../../../reducers';

type OwnProps = RouteComponentProps<{
    id: string
}>

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

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
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                        <Row className="align-items-center">
                            <Col>
                                <h3 className="mb-0">Detail Voucher</h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {loaded ? (
                            <React.Fragment>
                                <div className="mb-4">
                                    <Voucher 
                                        data={item} 
                                        isTicket={false} 
                                        isVoucher={true} />
                                </div>
                                <div className="mb-4">
                                    <Row>
                                        <Col>
                                            <JumlahPenggunaanVoucher data={item} />
                                        </Col>
                                        <Col>
                                            <JumlahPenggunaanTicket data={item}/>                              
                                        </Col>
                                    </Row>
                                </div>    
                            
                                <div>
                                    <RestaurantPromoList data={item}/>
                                    <PenggunaanVoucher data={item} />
                                </div>
                            </React.Fragment>
                        ) : loadMessage}
                    </CardBody>
                </Card>
            </Container>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    findVoucherPromoAction: (id: number) => dispatch(findVoucherPromoAction(id))
});

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Detail Voucher")