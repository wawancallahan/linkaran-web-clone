import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { PriceList } from '../../../../../types/admin/price'
import { AppState } from '../../../../../store/configureStore'
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
                        <th>Harga Dasar</th>
                        <th>Harga Per KM</th>
                        <th>Minimal Jarak Tempuh (KM)</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: PriceList, index: number) => {
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
    list: PriceList[]
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        list: state.price.list
    }
}

export default connect(mapStateToProps)(Table)
