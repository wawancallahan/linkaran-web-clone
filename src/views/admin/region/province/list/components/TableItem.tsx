import * as React from 'react'
import { ProvinceList, Province } from '../../../../../../types/admin/region/province'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteProvinceAction, setAlertProvinceShowAction } from '../../../../../../actions/admin/region/province'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: ProvinceList,
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
                props.deleteProvinceAction(id)
                .then((response: ApiResponse<Province>) => {
                    props.fetch(1);

                    props.setAlertProvinceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Province>) => {
                    props.setAlertProvinceShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/province/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteProvinceAction: (id: number) => Promise<ApiResponse<Province>>,
    setAlertProvinceShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteProvinceAction: (id: number) => dispatch(deleteProvinceAction(id)),
        setAlertProvinceShowAction: (message: string, color: string) => dispatch(setAlertProvinceShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
