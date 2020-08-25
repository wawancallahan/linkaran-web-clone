import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../../../components/BlockUi/BlockUi'
import { VoucherPromoUserUsed } from '../../../../../../../types/admin/voucherPromo'
import { AppState } from '../../../../../../../reducers/index'
import { connect } from 'react-redux'

type OwnProps = {
    loader: boolean,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Table: React.FC<Props> = (props) => {
    return (
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>Digunakan Oleh</th>
                        <th>Periode Pengunaan</th>
                        <th>Transaksi</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: VoucherPromoUserUsed, index: number) => {
                        return (
                            <TableItem key={index}
                                item={item}
                                index={index}
                                setLoader={props.setLoader}
                                />
                        )
                    })}
                </tbody>
            </TableReactstrap>
        </BlockUi>
    )
}

const mapStateToProps = (state: AppState) => ({
    list: state.voucherPromoUserUsed.list
});

export default connect(mapStateToProps)(Table)
