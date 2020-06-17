import * as React from 'react'
import { FoodList, Food } from '../../../../../types/admin/food'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteFoodAction, setAlertFoodShowAction } from '../../../../../actions/admin/food'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';

type OwnProps = {
    index: number,
    item: FoodList,
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
                props.deleteFoodAction(id)
                .then((response: ApiResponse<Food>) => {
                    props.fetch(1);

                    props.setAlertFoodShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<Food>) => {
                    props.setAlertFoodShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.price} /></td>
            <td>{props.item.status}</td>
            <td>{props.item.rating}</td>
            <td>{props.item.foodCategory ? props.item.foodCategory.name : ''}</td>
            <td>{props.item.restaurant ? props.item.restaurant.name : ''}</td>
            <td>{props.item.restaurant && props.item.restaurant.district ? props.item.restaurant.district.name : ''}</td>
            <td>
                <Link to={`/admin/food/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteFoodAction: (id: number) => Promise<ApiResponse<Food>>,
    setAlertFoodShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteFoodAction: (id: number) => dispatch(deleteFoodAction(id)),
        setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
