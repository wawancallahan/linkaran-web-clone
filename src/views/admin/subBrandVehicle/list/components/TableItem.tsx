import * as React from 'react'
import { SubBrandVehicleList, SubBrandVehicle } from '../../../../../types/admin/subBrandVehicle'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteSubBrandVehicleAction, setAlertSubBrandVehicleShowAction } from '../../../../../actions/admin/subBrandVehicle'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: SubBrandVehicleList,
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
                props.deleteSubBrandVehicleAction(id)
                .then((response: ApiResponse<SubBrandVehicle>) => {
                    props.fetch(1);

                    props.setAlertSubBrandVehicleShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<SubBrandVehicle>) => {
                    props.setLoader(false)

                    props.setAlertSubBrandVehicleShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.brandVehicle ? props.item.brandVehicle.name : ''}</td>
            <td>
                <Link to={`/admin/sub-brand-vehicle/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteSubBrandVehicleAction: (id: number) => Promise<ApiResponse<SubBrandVehicle>>,
    setAlertSubBrandVehicleShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteSubBrandVehicleAction: (id: number) => dispatch(deleteSubBrandVehicleAction(id)),
        setAlertSubBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertSubBrandVehicleShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
