import * as React from 'react';
import { AccountLinkPayList } from '../../../../../../types/admin/account/linkPay';
import { setAlertAccountLinkPayShowAction } from '../../../../../../actions/admin/account/linkPay';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { connect } from 'react-redux';

type OwnProps = {
    index: number,
    item: AccountLinkPayList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const TableItem: React.FC<Props> = (props) => {
    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.balance}</td>
            <td>{props.item.code}</td>
            <td>{props.item.type}</td>
            <td>
                <a href={`/admin/account/link-pay/${props.item.id}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i> Detail
                </a>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    setAlertAccountLinkPayShowAction: (message: string, color: string) => dispatch(setAlertAccountLinkPayShowAction(message, color)),
});

export default connect(null, mapDispatchToProps)(TableItem)
