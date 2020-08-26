import * as React from 'react'
import { FoodList, Food } from '../../../../../types/admin/food'
import { Button } from 'reactstrap'
import { deleteFoodAction, setAlertFoodShowAction } from '../../../../../actions/admin/food'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = RouteComponentProps & {
    index: number,
    item: FoodList,
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
                props.deleteFoodAction(id)
                .then((response: ApiResponse<Food>) => {
                    props.setAlertFoodShowAction("Data Berhasil Dihapus", 'success');
                    props.history.push(props.location.pathname);
                    props.fetch(1);
                    props.setLoader(false);
                })
                .catch( (error: ApiResponse<Food>) => {
                    props.setLoader(false)

                    props.setAlertFoodShowAction(error.error!.metaData.message, 'danger');
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
                <a href={`/admin/food/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteFoodAction: (id: number) => dispatch(deleteFoodAction(id)),
    setAlertFoodShowAction: (message: string, color: string) => dispatch(setAlertFoodShowAction(message, color)),
});

export default withRouter(connect(null, mapDispatchToProps)(TableItem));
