import * as React from 'react'
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, Button, CardFooter } from 'reactstrap';
import Filter from './components/Filter'
import Flash from './components/Flash'
import Paginate from './components/Paginate'
import Table from './components/Table'
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchCountryAction, setAlertCountryHideAction, clearFilterAction } from '../../../../../actions/admin/region/country';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';
import { AppState } from '../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchCountryAction(page);

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.router.location.search);
    
        const page = + (queryStringValue.page || 1);

        fetch(page)

        return () => {
            props.setAlertCountryHideAction();
            props.clearFilterCountryAction();
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
                                        <h3 className="mb-0">Daftar Negara</h3>
                                    </div>
                                    <div className="col text-right">
                                        <a href="/admin/region/country/create">
                                            <Button
                                                color="primary"
                                                size="sm"
                                            >
                                                Tambah Negara
                                            </Button>
                                        </a>
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
    fetchCountryAction: (page: number) => dispatch(fetchCountryAction(page)),
    setAlertCountryHideAction: () => dispatch(setAlertCountryHideAction()),
    clearFilterCountryAction: () => dispatch(clearFilterAction())
})

export default WithTitle(
    connect(mapStateToProps, mapDispatchToProps)(Index)
, "Daftar Negara")