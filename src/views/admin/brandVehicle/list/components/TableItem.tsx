import * as React from 'react'
import { BrandVehicleList, BrandVehicle } from '../../../../../types/admin/brandVehicle'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteBrandVehicleAction, setAlertBrandVehicleShowAction } from '../../../../../actions/admin/brandVehicle'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: BrandVehicleList,
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
                props.deleteBrandVehicleAction(id)
                .then((response: ApiResponse<BrandVehicle>) => {
                    props.fetch(1);

                    props.setAlertBrandVehicleShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<BrandVehicle>) => {
                    props.setAlertBrandVehicleShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/brand-vehicle/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteBrandVehicleAction: (id: number) => Promise<ApiResponse<BrandVehicle>>,
    setAlertBrandVehicleShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteBrandVehicleAction: (id: number) => dispatch(deleteBrandVehicleAction(id)),
        setAlertBrandVehicleShowAction: (message: string, color: string) => dispatch(setAlertBrandVehicleShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
