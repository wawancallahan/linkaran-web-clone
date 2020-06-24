import * as React from 'react'
import { WithDrawList } from '../../../../../types/financialManager/withdraw'
import { Link } from 'react-router-dom'
import { setAlertWithDrawShowAction } from '../../../../../actions/financialManager/withdraw'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'

type OwnProps = {
    index: number,
    item: WithDrawList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.name : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.phoneNumber : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.email : ''}</td>
            <td>{props.item.request && props.item.request.bankName}/{props.item.request && props.item.request.accountNumber}</td>
            <td>{props.item.request && props.item.request.accountName}</td>
            <td>{props.item.request && props.item.request.bank ? props.item.request.bank.accountName : ''}</td>
            <td>{props.item.isManual ? "Ya" : "Tidak"}</td>
            <td>
                <Link to={`/admin/withdraw/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i> Detail
                </Link>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    setAlertWithDrawShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertWithDrawShowAction: (message: string, color: string) => dispatch(setAlertWithDrawShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
