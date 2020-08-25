import * as React from 'react'
import { TopUpList } from '../../../../../types/financialManager/topup'
import { setAlertTopUpShowAction } from '../../../../../actions/financialManager/topup'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { Badge } from 'reactstrap'
import NumberFormat from 'react-number-format'

type OwnProps = {
    index: number,
    item: TopUpList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const statusApproved = (item: TopUpList) => {
    if (item.approvedBy) {
        return <Badge color="success">Disetujui</Badge>;
    }

    return <Badge color="info">Menunggu</Badge>;
}

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.name : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.phoneNumber : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.email : ''}</td>
            <td>{props.item.request && props.item.request.bankName}/{props.item.request && props.item.request.accountNumber}</td>
            <td>{props.item.request && props.item.request.accountName}</td>
            <td>{props.item.request && props.item.request.uniqueCodeWithAmount ? <NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.request.uniqueCodeWithAmount} /> : '-'}</td>
            <td>{props.item.request && props.item.request.bank ? props.item.request.bank.accountName : ''}</td>
            <td>{props.item.isManual ? "Ya" : "Tidak"}</td>
            <td>{statusApproved(props.item)}</td>
            <td>
                <a href={`/admin/topup/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i> Detail
                </a>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertTopUpShowAction: (message: string, color: string) => dispatch(setAlertTopUpShowAction(message, color)),
});

export default connect(null, mapDispatchToProps)(TableItem)
