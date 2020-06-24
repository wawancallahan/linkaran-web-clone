import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { LinkPayList } from '../../../../../../types/admin/transaction/linkPay'
import { AppState } from '../../../../../../store/configureStore'
import { connect } from 'react-redux'

type OwnProps = {
    loader: boolean,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & LinkStateToProps

const Table: React.FC<Props> = (props) => {
    return (
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Jumlah</th>
                        <th>Tipe</th>
                        <th>Dikirm ke</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: LinkPayList, index: number) => {
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
        </BlockUi>
    )
}

type LinkStateToProps = {
    list: LinkPayList[]
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        list: state.transactionLinkPay.list
    }
}

export default connect(mapStateToProps)(Table)
