import * as React from 'react'
import { VoucherTypeList, VoucherType } from '../../../../../types/admin/voucherType'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteVoucherTypeAction, setAlertVoucherTypeShowAction } from '../../../../../actions/admin/voucherType'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: VoucherTypeList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>
}

type Props = LinkDispatchToProps & OwnProps

const TableItem: React.FC<Props> = (props) => {
    const deleteItem = (id: number) => {
        swal("Apakah anda yakin?", "Data yang dihapus tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.deleteVoucherTypeAction(id)
                .then((response: ApiResponse<VoucherType>) => {
                    props.fetch(1);

                    props.setAlertVoucherTypeShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<VoucherType>) => {
                    props.setAlertVoucherTypeShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/voucher-type/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i> Edit
                </Link>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i> Hapus
                </Button>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    deleteVoucherTypeAction: (id: number) => Promise<ApiResponse<VoucherType>>,
    setAlertVoucherTypeShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteVoucherTypeAction: (id: number) => dispatch(deleteVoucherTypeAction(id)),
        setAlertVoucherTypeShowAction: (message: string, color: string) => dispatch(setAlertVoucherTypeShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
