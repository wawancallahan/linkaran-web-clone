import * as React from 'react'
import Pagination from '../../../../../components/Pagination/PaginationOnLink';
import { Paginator } from '../../../../../types/paginator';
import { AppState } from '../../../../../reducers/index';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & RouteComponentProps

const Paginate: React.FC<Props> = (props) => {

    return (
        <Pagination pageCount={props.paginate.pageCount}
                currentPage={props.paginate.currentPage}
                itemCount={props.paginate.itemCount}
                url={props.location.pathname} />
    )
}

type LinkStateToProps = {
    paginate: Paginator
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        paginate: state.voucherPromo.paginate
    }
}

export default withRouter(connect(mapStateToProps)(Paginate))