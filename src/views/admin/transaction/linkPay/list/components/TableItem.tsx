import * as React from 'react'
import { LinkPayList } from '../../../../../../types/admin/transaction/linkPay'
import { setAlertLinkPayShowAction } from '../../../../../../actions/admin/transaction/linkPay'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { amountFormat } from '../../../../../../helpers/number'
import { typeOfTransaction } from '../../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: LinkPayList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{amountFormat(props.item.amount)}</td>
            <td>{typeOfTransaction(props.item.is_deposit, props.item.is_withdraw, props.item.is_transfer)}</td>
            <td>{props.item.send_to}</td>
            <td>{props.item.datetime_transaction}</td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertLinkPayShowAction: (message: string, color: string) => dispatch(setAlertLinkPayShowAction(message, color)),
});

export default connect(null, mapDispatchToProps)(TableItem)
