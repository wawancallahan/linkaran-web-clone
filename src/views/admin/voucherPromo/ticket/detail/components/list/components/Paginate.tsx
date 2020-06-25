import * as React from 'react'
import Pagination from '../../../../../../../../components/Pagination/Pagination';
import { Paginator } from '../../../../../../../../types/paginator';
import { AppState } from '../../../../../../../../store/configureStore';
import { connect } from 'react-redux';
import { VoucherPromo } from '../../../../../../../../types/admin/voucherPromo';

type OwnProps = {
    fetch: (page: number, id: number) => void,
    data: VoucherPromo | null
}

type Props = OwnProps & LinkStateToProps

const Paginate: React.FC<Props> = (props) => {

    return (
        <Pagination pageCount={props.paginate.pageCount}
                currentPage={props.paginate.currentPage}
                itemCount={props.paginate.itemCount}
                itemClicked={(page: number) => {
                    if (props.data) {
                        props.fetch(page, props.data.id)
                    }
                }} />
    )
}

type LinkStateToProps = {
    paginate: Paginator
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        paginate: state.ticketVoucher.paginate
    }
}

export default connect(mapStateToProps)(Paginate)