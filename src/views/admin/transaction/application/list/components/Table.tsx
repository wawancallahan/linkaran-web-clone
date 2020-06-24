import * as React from 'react'
import {
    Table as TableReactstrap
} from 'reactstrap'
import TableItem from './TableItem'
import BlockUi from '../../../../../../components/BlockUi/BlockUi'
import { ApplicationList } from '../../../../../../types/admin/transaction/application'
import { AppState } from '../../../../../../store/configureStore'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { typeTransactionFormat } from '../../../../../../helpers/utils'
import queryString from 'query-string';

type OwnProps = RouteComponentProps & {
    loader: boolean,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & LinkStateToProps

const Table: React.FC<Props> = (props) => {

    const getTypeQuery = () => {
        const queryStringValue = queryString.parse(props.location.search);
    
        const typeQuery = queryStringValue.type as string || undefined;

        return typeTransactionFormat(typeQuery)
    }

    return (
        <BlockUi blocking={props.loader}>
            <TableReactstrap className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Model Kendaraan</th>
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
        </BlockUi>
    )
}

type LinkStateToProps = {
    list: ApplicationList[]
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        list: state.transactionApplication.list
    }
}

export default withRouter(connect(mapStateToProps)(Table))
