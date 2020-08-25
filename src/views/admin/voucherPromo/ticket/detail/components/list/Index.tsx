import * as React from 'react'
import HeaderView from '../../../../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, CardFooter } from 'reactstrap';
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchTicketVoucherAction } from '../../../../../../../actions/admin/ticket';
import { AppActions } from '../../../../../../../types';
import { VoucherPromoShow } from '../../../../../../../types/admin/voucherPromo';
import Paginate from './components/Paginate';
import Table from './components/Table';
import TicketGenerate from '../generate/Index';
import TicketCreate from '../create/Index';
import { AppState } from '../../../../../../../reducers';

type OwnProps = {
    data: VoucherPromoShow | null
}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number, id: number) => {
        setLoader(true)

        await props.fetchTicketVoucherAction(page, id);

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.router.location.search);
    
        const page = + (queryStringValue.page || 1);

        if (props.data) {
            fetch(page, props.data.id)
        }
    }, [])

    return (
        <React.Fragment>
            <HeaderView />

            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center mb-3">
                                    <div className="col">
                                        <h3 className="mb-0">Daftar Tiket</h3>
                                    </div>
                                    <div className="col text-right">
                                        <TicketCreate fetch={fetch} data={props.data} />
                                        <TicketGenerate fetch={fetch} data={props.data} />
                                    </div>
                                </Row>
                            </CardHeader>

                            <Table loader={loader} fetch={fetch} setLoader={setLoader} data={props.data} />
                            
                            <CardFooter className="py-4">
                                <Paginate />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>    
        </React.Fragment>
    );
}

const mapStateToProps = (state: AppState) => ({
    router: state.router
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, any, AppActions>, OwnProps: OwnProps) => ({
    fetchTicketVoucherAction: (page: number, id: number) => dispatch(fetchTicketVoucherAction(page, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);