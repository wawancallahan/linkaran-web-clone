import * as React from 'react'
import Pagination from '../../../../../../components/Pagination/PaginationOnLink';
import { AppState } from '../../../../../../reducers';
import { connect } from 'react-redux';

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
    router: state.router,
    paginate: state.accountLinkPay.paginate
})

export default connect(mapStateToProps)(Paginate)