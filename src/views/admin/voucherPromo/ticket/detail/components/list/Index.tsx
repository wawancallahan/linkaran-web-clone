import * as React from 'react'
import HeaderView from '../../../../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, Button, CardFooter } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchTicketVoucherAction } from '../../../../../../../actions/admin/ticket';
import { AppActions } from '../../../../../../../types';
import { VoucherPromo } from '../../../../../../../types/admin/voucherPromo';
import Paginate from './components/Paginate'
import Table from './components/Table'

type OwnProps = RouteComponentProps & {
    data: VoucherPromo | null
}

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number, id: number) => {
        setLoader(true)

        await props.fetchTicketVoucherAction(page, id);

        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', page.toString());

        props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.location.search);
    
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
                                       
                                    </div>
                                </Row>
                            </CardHeader>

                            <Table loader={loader} fetch={fetch} setLoader={setLoader} data={props.data} />
                            
                            <CardFooter className="py-4">
                                <Paginate fetch={fetch} data={props.data} />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>    
        </React.Fragment>
    );
}

type LinkDispatchToProps = {
    fetchTicketVoucherAction: (page: number, id: number) => Promise<Boolean>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchTicketVoucherAction: (page: number, id: number) => dispatch(fetchTicketVoucherAction(page, id)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Index))