import * as React from 'react'
import { SubDistrictList, SubDistrict } from '../../../../../../types/admin/region/subDistrict'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteSubDistrictAction, setAlertSubDistrictShowAction } from '../../../../../../actions/admin/region/subDistrict'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: SubDistrictList,
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
                props.deleteSubDistrictAction(id)
                .then((response: ApiResponse<SubDistrict>) => {
                    props.fetch(1);

                    props.setAlertSubDistrictShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<SubDistrict>) => {
                    props.setLoader(false)

                    props.setAlertSubDistrictShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/sub-district/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteSubDistrictAction: (id: number) => Promise<ApiResponse<SubDistrict>>,
    setAlertSubDistrictShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteSubDistrictAction: (id: number) => dispatch(deleteSubDistrictAction(id)),
        setAlertSubDistrictShowAction: (message: string, color: string) => dispatch(setAlertSubDistrictShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
