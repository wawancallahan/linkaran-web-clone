import * as React from 'react'
import { VillageList, Village } from '../../../../../../types/admin/region/village'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteVillageAction, setAlertVillageShowAction } from '../../../../../../actions/admin/region/village'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: VillageList,
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
                props.deleteVillageAction(id)
                .then((response: ApiResponse<Village>) => {
                    props.fetch(1);

                    props.setAlertVillageShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Village>) => {
                    props.setLoader(false)

                    props.setAlertVillageShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/village/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteVillageAction: (id: number) => Promise<ApiResponse<Village>>,
    setAlertVillageShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteVillageAction: (id: number) => dispatch(deleteVillageAction(id)),
        setAlertVillageShowAction: (message: string, color: string) => dispatch(setAlertVillageShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
