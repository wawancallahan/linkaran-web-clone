import * as React from 'react'
import Pagination from '../../../../../components/Pagination/PaginationOnLink';
import { connect } from 'react-redux';
import { AppState } from '../../../../../reducers';

type OwnProps = {}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Paginate: React.FC<Props> = (props) => {
    return (
        <Pagination pageCount={props.paginate.pageCount}
                currentPage={props.paginate.currentPage}
                itemCount={props.paginate.itemCount}
                url={props.router.location.pathname} />
    )
}

const mapStateToProps = (state: AppState) => ({
    paginate: state.subBrandVehicle.paginate,
    router: state.router
});

export default connect(mapStateToProps)(Paginate);