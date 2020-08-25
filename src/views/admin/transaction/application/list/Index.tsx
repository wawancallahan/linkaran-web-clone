import * as React from 'react'
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, CardFooter } from 'reactstrap';
import Filter from './components/Filter'
import Flash from './components/Flash'
import Paginate from './components/Paginate'
import Table from './components/Table'
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchApplicationAction, setAlertApplicationHideAction, clearFilterAction } from '../../../../../actions/admin/transaction/application';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import { AppState } from '../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchApplicationAction(page);

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.router.location.search);
    
        const page = + (queryStringValue.page || 1);

        fetch(page)

        return () => {
            props.setAlertApplicationHideAction();
            props.clearFilterApplicationAction();
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
                                        <h3 className="mb-0">Daftar Transaksi Aplikasi</h3>
                                    </div>
                                </Row>
                                <Filter />
                            </CardHeader>

                            <Table loader={loader} fetch={fetch} setLoader={setLoader}/>
                            
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
    fetchApplicationAction: (page: number) => dispatch(fetchApplicationAction(page)),
    setAlertApplicationHideAction: () => dispatch(setAlertApplicationHideAction()),
    clearFilterApplicationAction: () => dispatch(clearFilterAction())
});

export default WithTitle(
    connect(null, mapDispatchToProps)(Index)
, "Daftar Transaksi Aplikasi")