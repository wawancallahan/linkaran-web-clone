import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../../../types/api'
import swal from 'sweetalert'
import { toast, TypeOptions } from 'react-toastify'
import { deleteTicketAction } from '../../../../../../../../actions/admin/ticket'
import { Ticket, TicketList } from '../../../../../../../../types/admin/ticket'
import { parseDateTimeFormat } from '../../../../../../../../helpers/utils'
import { Button } from 'reactstrap'
import { VoucherPromo } from '../../../../../../../../types/admin/voucherPromo'

type OwnProps = {
    data: VoucherPromo | null,
    index: number,
    item: TicketList,
    key: number,
    fetch: (page: number, id: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {

    const toastNotify = (message: string, type: TypeOptions) => {
        toast(message, {
            type: type,
            position: toast.POSITION.TOP_RIGHT,
            draggable: false,
            hideProgressBar: true,
            closeOnClick: false
        })
    }

    const deleteItem = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.deleteTicketAction(id)
                .then((response: ApiResponse<Ticket>) => {
                    toastNotify('Data Berhasil Dihapus', "success");
                    if (props.data) {
                        props.fetch(1, props.data.id);
                    }
                })
                .catch( (error: ApiResponse<Ticket>) => {
                    let message = "Gagal Mendapatkan Response";

                    if (error.error) {
                        message = error.error.metaData.message;
                    }

                    toastNotify(message, "error");
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.item.redeemCode}</td>
            <td>{props.item.claimAt ? parseDateTimeFormat(props.item.claimAt) : ''}</td>
            <td>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    deleteTicketAction: (id: number) => Promise<ApiResponse<Ticket>>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteTicketAction: (id: number) => dispatch(deleteTicketAction(id)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
