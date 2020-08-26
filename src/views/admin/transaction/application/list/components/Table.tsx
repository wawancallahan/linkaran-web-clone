import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { ApplicationList } from '../../../../../../types/admin/transaction/application'
import { AppState } from '../../../../../../reducers'
import { connect } from 'react-redux'
import { typeTransactionFormat } from '../../../../../../helpers/utils'
import queryString from 'query-string';
import TableSkeleton from '../../../../../../components/Skeleton/TableSkeleton'

type OwnProps =  {
    loader: boolean,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Table: React.FC<Props> = (props) => {

    const getTypeQuery = () => {
        const queryStringValue = queryString.parse(props.router.location.search);
    
        const typeQuery = queryStringValue.type as string || undefined;

        return typeTransactionFormat(typeQuery)
    }

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
                    <th>Tanggal & Waktu</th>
                    <th>No Transaksi</th>
                    <th>Pelanggan</th>
                    <th>Driver</th>
                    <th>Layanan</th>
                    <th>Total Transaksi</th>
                    <th>Status</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map((item: ApplicationList, index: number) => {
                    return (
                        <TableItem key={index}
                            item={item}
                            index={index}
                            fetch={props.fetch}
                            setLoader={props.setLoader}
                            type={getTypeQuery()}
                            />
                    )
                })}
            </tbody>
        </TableReactstrap>
    )
}

const mapStateToProps = (state: AppState) => ({
    list: state.transactionApplication.list,
    router: state.router
});

export default connect(mapStateToProps)(Table);
