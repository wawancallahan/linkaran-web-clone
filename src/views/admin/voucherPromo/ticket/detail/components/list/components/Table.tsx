import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../../../../components/BlockUi/BlockUi'
import { TicketList } from '../../../../../../../../types/admin/ticket'
import { AppState } from '../../../../../../../../reducers'
import { connect } from 'react-redux'
import { VoucherPromo } from '../../../../../../../../types/admin/voucherPromo'

type OwnProps = {
    data: VoucherPromo | null,
    loader: boolean,
    fetch: (page: number, id: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Table: React.FC<Props> = (props) => {
    return (
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>Kode</th>
                        <th>Tanggal Digunakan</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: TicketList, index: number) => {
                        return (
                            <TableItem key={index}
                                item={item}
                                index={index}
                                fetch={props.fetch}
                                setLoader={props.setLoader}
                                data={props.data}
                                />
                        )
                    })}
                </tbody>
            </TableReactstrap>
        </BlockUi>
    )
}

const mapStateToProps = (state: AppState) => ({
    list: state.ticketVoucher.list
});

export default connect(mapStateToProps)(Table)
