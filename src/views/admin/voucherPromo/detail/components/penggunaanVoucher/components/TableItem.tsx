import * as React from 'react'
import { VoucherPromoUserUsed } from '../../../../../../../types/admin/voucherPromo'
import { parseDateTimeFormat } from '../../../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: VoucherPromoUserUsed,
    key: number,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>
                {props.item.user.name}
            </td>
            <td>
                {props.item.transaction.dateTime ? parseDateTimeFormat(props.item.transaction.dateTime) : ''}
            </td>
            <td>
                {props.item.transaction.numberTransaction}
            </td>
        </tr>
    )
}

export default TableItem
