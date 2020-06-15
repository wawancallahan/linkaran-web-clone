import * as React from 'react'
import HeaderView from '../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, Button, CardFooter } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Filter from './components/Filter'
import Flash from './components/Flash'
import Paginate from './components/Paginate'
import Table from './components/Table'
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchBankAction, setAlertBankHideAction, clearFilterAction } from '../../../../actions/admin/bank';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchBankAction(page);

        let currentUrlParams = new URLSearchParams(window.location.search);
        currentUrlParams.set('page', page.toString());

        props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.location.search);
    
        const page = + (queryStringValue.page || 1);

        fetch(page)

        return () => {
            props.setAlertBankHideAction();
            props.clearFilterBankAction();
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
                                <Flash />
                                <Row className="align-items-center mb-3">
                                    <div className="col">
                                        <h3 className="mb-0">Daftar Bank</h3>
                                    </div>
                                    <div className="col text-right">
                                    <Link to="/admin/voucher-type/create">
                                        <Button
                                            color="primary"
                                            size="sm"
                                        >
                                            Tambah Bank
                                        </Button>
                                    </Link>
                                    </div>
                                </Row>
                                <Filter />
                            </CardHeader>

                            <Table loader={loader} fetch={fetch} setLoader={setLoader}/>
                            
                            <CardFooter className="py-4">
                                <Paginate fetch={fetch} />
                            </CardFooter>
                        </Card>
                    </div>
                </Row>
            </Container>    
        </React.Fragment>
    );
}

type LinkDispatchToProps = {
    fetchBankAction: (page: number) => Promise<Boolean>,
    setAlertBankHideAction: () => void,
    clearFilterBankAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchBankAction: (page: number) => dispatch(fetchBankAction(page)),
        setAlertBankHideAction: () => dispatch(setAlertBankHideAction()),
        clearFilterBankAction: () => dispatch(clearFilterAction())
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Daftar Bank")