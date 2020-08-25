import * as React from 'react'
import { BankList, Bank } from '../../../../../types/admin/bank'
import { Button } from 'reactstrap'
import { deleteBankAction, setAlertBankShowAction } from '../../../../../actions/admin/bank'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: BankList,
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
                props.deleteBankAction(id)
                .then((response: ApiResponse<Bank>) => {
                    props.fetch(1);

                    props.setAlertBankShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Bank>) => {
                    props.setLoader(false)

                    props.setAlertBankShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.nama}</td>
            <td>{props.item.bankName}</td>
            <td>{props.item.accountName}</td>
            <td>{props.item.accountNumber}</td>
            <td>
                <a href={`/admin/bank/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteBankAction: (id: number) => dispatch(deleteBankAction(id)),
    setAlertBankShowAction: (message: string, color: string) => dispatch(setAlertBankShowAction(message, color)),
});

export default connect(null, mapDispatchToProps)(TableItem)
