import * as React from 'react'
import { UserList, User } from '../../../../../types/admin/user'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteUserAction, setAlertUserShowAction } from '../../../../../actions/admin/user'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: UserList,
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
                props.deleteUserAction(id)
                .then((response: ApiResponse<User>) => {
                    props.fetch(1);

                    props.setAlertUserShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<User>) => {
                    props.setLoader(false)

                    props.setAlertUserShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.phoneNumber}</td>
            <td>{props.item.email}</td>
            <td>{props.item.telegramuser}</td>
            <td>
                <Link to={`/admin/user/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteUserAction: (id: number) => Promise<ApiResponse<User>>,
    setAlertUserShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteUserAction: (id: number) => dispatch(deleteUserAction(id)),
        setAlertUserShowAction: (message: string, color: string) => dispatch(setAlertUserShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
