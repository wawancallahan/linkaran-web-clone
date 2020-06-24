import * as React from 'react'
import { HistoryDataList } from '../../../../../types/admin/historyData/historyData'
import { Link } from 'react-router-dom'
import { setAlertHistoryDataShowAction } from '../../../../../actions/admin/historyData'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { parseDateFormat } from '../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: HistoryDataList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.user.name}</td>
            <td>{props.item.user.phoneNumber}</td>
            <td>{props.item.user.email}</td>
            <td>{props.item.entityName}</td>
            <td>{parseDateFormat(props.item.dateCreate)}</td>
            <td>{props.item.event}</td>
            <td>
                <Link to={`/admin/history-data/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    setAlertHistoryDataShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertHistoryDataShowAction: (message: string, color: string) => dispatch(setAlertHistoryDataShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
