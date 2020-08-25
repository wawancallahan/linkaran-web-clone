import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { ServicePriceList } from '../../../../../types/admin/servicePrice'
import { AppState } from '../../../../../reducers'
import { connect } from 'react-redux'

type OwnProps = {
    loader: boolean,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const Table: React.FC<Props> = (props) => {
    return (
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Harga Dasar</th>
                        <th>Harga Per KM</th>
                        <th>Minimal Jarak Tempuh (KM)</th>
                        <th>Wilayah</th>
                        <th>Layanan</th>
                        <th>Jenis Kendaraan</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: ServicePriceList, index: number) => {
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
    list: state.servicePrice.list
});

export default connect(mapStateToProps)(Table)
