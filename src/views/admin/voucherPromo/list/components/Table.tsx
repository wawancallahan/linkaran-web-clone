import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { VoucherPromoList } from '../../../../../types/admin/voucherPromo'
import { AppState } from '../../../../../reducers'
import { connect } from 'react-redux'
import TableSkeleton from '../../../../../components/Skeleton/TableSkeleton'

type OwnProps = {
    loader: boolean,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Table: React.FC<Props> = (props) => {

    if (props.loader) return (
        <BlockUi blocking={props.loader}>
            <TableSkeleton headCount={5} withOption />
        </BlockUi>
    );

    return (
        <TableReactstrap className="align-items-center table-flush" responsive>
            <thead className="thead-light">
                <tr>
                    <th>No</th>
                    <th>Voucher</th>
                    <th>Target</th>
                    <th>Voucher Terpakai</th>
                    <th>Periode</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map((item: VoucherPromoList, index: number) => {
                    return (
                        <TableItem key={index}
                            item={item}
                            index={index}
                            fetch={props.fetch}
                            setLoader={props.setLoader}
                            />
                    )
                })}
            </tbody>
        </TableReactstrap>
    )
}

const mapStateToProps = (state: AppState) => ({
    list: state.voucherPromo.list
});

export default connect(mapStateToProps)(Table)
