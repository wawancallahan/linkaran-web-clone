import * as React from 'react'
import { ApplicationList, Application } from '../../../../../../types/admin/transaction/application'
import { Link } from 'react-router-dom'
import { deleteApplicationAction, setAlertApplicationShowAction } from '../../../../../../actions/admin/transaction/application'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import { Badge } from 'reactstrap'
import NumberFormat from 'react-number-format'
import { colorStatusFormat } from '../../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: ApplicationList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    type: string
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.date}</td>
            <td>{props.item.numberTransaction}</td>
            <td>{props.item.costumerName}</td>
            <td>{props.item.driverName}</td>
            <td>
                <Badge color="success">{props.item.service}</Badge>
            </td>
                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.totalCost} /></td>
            <td>
                <Badge color={colorStatusFormat(props.item.status)}>{props.item.status}</Badge>
            </td>
            <td>
                <Link to={`/admin/transaction/application/${props.type}/${props.item.numberTransaction}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </Link>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    deleteApplicationAction: (id: number) => Promise<ApiResponse<Application>>,
    setAlertApplicationShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteApplicationAction: (id: number) => dispatch(deleteApplicationAction(id)),
        setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
