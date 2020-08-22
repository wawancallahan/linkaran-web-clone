import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../components/BlockUi/BlockUi'
import { FoodList } from '../../../../../types/admin/food'
import { AppState } from '../../../../../reducers/index'
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
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Status</th>
                        <th>Rating</th>
                        <th>Kategori</th>
                        <th>Restoran</th>
                        <th>Kota</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {props.list.map((item: FoodList, index: number) => {
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
    list: FoodList[]
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        list: state.food.list
    }
}

export default connect(mapStateToProps)(Table)
