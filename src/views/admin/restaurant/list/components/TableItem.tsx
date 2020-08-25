import * as React from 'react'
import { RestaurantList, Restaurant } from '../../../../../types/admin/restaurant'
import { Button } from 'reactstrap'
import { deleteRestaurantAction, setAlertRestaurantShowAction } from '../../../../../actions/admin/restaurant'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: RestaurantList,
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
                props.deleteRestaurantAction(id)
                .then((response: ApiResponse<Restaurant>) => {
                    props.fetch(1);

                    props.setAlertRestaurantShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Restaurant>) => {
                    props.setLoader(false)

                    props.setAlertRestaurantShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.point ? (props.item.point.lat + "," + props.item.point.lng) : ''}</td>
            <td>{props.item.rating}</td>
            <td>{props.item.address}</td>
            <td>{props.item.registered ? 'Ya' : 'Tidak'}</td>
            <td>
                <a href={`/admin/restaurant/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteRestaurantAction: (id: number) => dispatch(deleteRestaurantAction(id)),
    setAlertRestaurantShowAction: (message: string, color: string) => dispatch(setAlertRestaurantShowAction(message, color))
});

export default connect(null, mapDispatchToProps)(TableItem)
