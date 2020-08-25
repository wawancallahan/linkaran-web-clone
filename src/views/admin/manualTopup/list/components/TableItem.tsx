import * as React from 'react'
import { ManualTopUpList, ManualTopUp } from '../../../../../types/admin/manualTopup'
import { Button } from 'reactstrap'
import { deleteManualTopUpAction, setAlertManualTopUpShowAction } from '../../../../../actions/admin/manualTopup'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { parseDateTimeFormat } from '../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: ManualTopUpList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const TableItem: React.FC<Props> = (props) => {
    const deleteItem = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.deleteManualTopUpAction(id)
                .then((response: ApiResponse<ManualTopUp>) => {
                    props.fetch(1);

                    props.setAlertManualTopUpShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<ManualTopUp>) => {
                    props.setLoader(false)

                    props.setAlertManualTopUpShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.name : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.phoneNumber : ''}</td>
            <td>{(props.item.request && props.item.request.driverProfile && props.item.request.driverProfile.user) ? props.item.request.driverProfile.user.email : ''}</td>
            <td>{props.item.request && props.item.request.bankName}/{props.item.request && props.item.request.accountNumber}</td>
            <td>{props.item.request && props.item.request.accountName}</td>
            <td>{props.item.request && props.item.request.uniqueCodeWithAmount}</td>
            <td>{props.item.request && props.item.request.bank ? props.item.request.bank.accountName : ''}</td>
            <td>{parseDateTimeFormat(props.item.transactionDate)}</td>
            <td>{props.item.isManual ? "Ya" : "Tidak"}</td>
            <td>
                <a href={`/admin/manual-topup/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </a>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i> Hapus
                </Button>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    deleteManualTopUpAction: (id: number) => dispatch(deleteManualTopUpAction(id)),
    setAlertManualTopUpShowAction: (message: string, color: string) => dispatch(setAlertManualTopUpShowAction(message, color))
});

export default connect(null, mapDispatchToProps)(TableItem)
