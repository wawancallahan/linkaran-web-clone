import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { ManualWithDrawList } from '../../../../../types/admin/manualWithdraw'
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
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>No. Telepon</th>
                        <th>Email</th>
                        <th>Bank/Akun</th>
                        <th>Nama Akun</th>
                        <th>Bank Tujuan</th>
                        <th>Tanggal</th>
                        <th>Manual</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: ManualWithDrawList, index: number) => {
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

const mapStateToProps = (state: AppState) => ({
    list: state.manualWithdraw.list
});

export default connect(mapStateToProps)(Table)
