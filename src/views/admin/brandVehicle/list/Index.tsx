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
import { fetchBrandVehicleAction, setAlertBrandVehicleHideAction, clearFilterAction } from '../../../../actions/admin/brandVehicle';
import { AppActions } from '../../../../types';
import WithTitle from '../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchBrandVehicleAction(page);

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.location.search);
    
        const page = + (queryStringValue.page || 1);

        fetch(page)

        return () => {
            props.setAlertBrandVehicleHideAction();
            props.clearFilterBrandVehicleAction();
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
                                        <h3 className="mb-0">Daftar Model Kendaraan</h3>
                                    </div>
                                    <div className="col text-right">
                                    <Link to="/admin/brand-vehicle/create">
                                        <Button
                                            color="primary"
                                            size="sm"
                                        >
                                            Tambah Model Kendaraan
                                        </Button>
                                    </Link>
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

type LinkDispatchToProps = {
    fetchBrandVehicleAction: (page: number) => Promise<Boolean>,
    setAlertBrandVehicleHideAction: () => void,
    clearFilterBrandVehicleAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchBrandVehicleAction: (page: number) => dispatch(fetchBrandVehicleAction(page)),
        setAlertBrandVehicleHideAction: () => dispatch(setAlertBrandVehicleHideAction()),
        clearFilterBrandVehicleAction: () => dispatch(clearFilterAction())
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Daftar Model Kendaraan")