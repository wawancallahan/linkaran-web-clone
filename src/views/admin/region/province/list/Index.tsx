import * as React from 'react'
import HeaderView from '../../../../../components/Headers/HeaderView';
import { Container, Row, Card, CardHeader, Button, CardFooter } from 'reactstrap';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import Filter from './components/Filter'
import Flash from './components/Flash'
import Paginate from './components/Paginate'
import Table from './components/Table'
import queryString from 'query-string';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchProvinceAction, setAlertProvinceHideAction, clearFilterAction } from '../../../../../actions/admin/region/province';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchProvinceAction(page);

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
            props.setAlertProvinceHideAction();
            props.clearFilterProvinceAction();
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
                                        <h3 className="mb-0">Daftar Provinsi</h3>
                                    </div>
                                    <div className="col text-right">
                                    <Link to="/admin/region/province/create">
                                        <Button
                                            color="primary"
                                            size="sm"
                                        >
                                            Tambah Provinsi
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
    fetchProvinceAction: (page: number) => Promise<Boolean>,
    setAlertProvinceHideAction: () => void,
    clearFilterProvinceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchProvinceAction: (page: number) => dispatch(fetchProvinceAction(page)),
        setAlertProvinceHideAction: () => dispatch(setAlertProvinceHideAction()),
        clearFilterProvinceAction: () => dispatch(clearFilterAction())
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Daftar Provinsi")