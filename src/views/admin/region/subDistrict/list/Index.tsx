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
import { fetchSubDistrictAction, setAlertSubDistrictHideAction, clearFilterAction } from '../../../../../actions/admin/region/subDistrict';
import { AppActions } from '../../../../../types';
import WithTitle from '../../../../../hoc/WithTitle';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps

const Index: React.FC<Props> = (props) => {

    const [loader, setLoader] = React.useState(false);

    const fetch = async (page: number) => {
        setLoader(true)

        await props.fetchSubDistrictAction(page);

        setLoader(false)
    }

    React.useEffect(() => {
        const queryStringValue = queryString.parse(props.location.search);
    
        const page = + (queryStringValue.page || 1);

        fetch(page)

        return () => {
            props.setAlertSubDistrictHideAction();
            props.clearFilterSubDistrictAction();
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
                                        <h3 className="mb-0">Daftar Kecamatan</h3>
                                    </div>
                                    <div className="col text-right">
                                    <Link to="/admin/region/sub-district/create">
                                        <Button
                                            color="primary"
                                            size="sm"
                                        >
                                            Tambah Kecamatan
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
    fetchSubDistrictAction: (page: number) => Promise<Boolean>,
    setAlertSubDistrictHideAction: () => void,
    clearFilterSubDistrictAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchSubDistrictAction: (page: number) => dispatch(fetchSubDistrictAction(page)),
        setAlertSubDistrictHideAction: () => dispatch(setAlertSubDistrictHideAction()),
        clearFilterSubDistrictAction: () => dispatch(clearFilterAction())
    }
}

export default WithTitle(
    withRouter(connect(null, mapDispatchToProps)(Index))
, "Daftar Kecamatan")