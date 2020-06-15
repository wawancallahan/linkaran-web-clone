import * as React from 'react'
import { FoodCategoryList, FoodCategory } from '../../../../../types/admin/foodCategory'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteFoodCategoryAction, setAlertFoodCategoryShowAction } from '../../../../../actions/admin/foodCategory'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: FoodCategoryList,
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
                props.deleteFoodCategoryAction(id)
                .then((response: ApiResponse<FoodCategory>) => {
                    props.fetch(1);

                    props.setAlertFoodCategoryShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<FoodCategory>) => {
                    props.setAlertFoodCategoryShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/food-category/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteFoodCategoryAction: (id: number) => Promise<ApiResponse<FoodCategory>>,
    setAlertFoodCategoryShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteFoodCategoryAction: (id: number) => dispatch(deleteFoodCategoryAction(id)),
        setAlertFoodCategoryShowAction: (message: string, color: string) => dispatch(setAlertFoodCategoryShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
