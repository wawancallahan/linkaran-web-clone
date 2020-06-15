import * as React from 'react'
import Pagination from '../../../../../components/Pagination/Pagination';
import { Paginator } from '../../../../../types/paginator';
import { AppState } from '../../../../../store/configureStore';
import { connect } from 'react-redux';

type OwnProps = {
    fetch: (page: number) => void
}

type Props = OwnProps & LinkStateToProps

const Paginate: React.FC<Props> = (props) => {

    return (
        <Pagination pageCount={props.paginate.pageCount}
                currentPage={props.paginate.currentPage}
                itemCount={props.paginate.itemCount}
                itemClicked={props.fetch} />
    )
}

type LinkStateToProps = {
    paginate: Paginator
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        paginate: state.brandVehicle.paginate
    }
}

export default connect(mapStateToProps, {})(Paginate)