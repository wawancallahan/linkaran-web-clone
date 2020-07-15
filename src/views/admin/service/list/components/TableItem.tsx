import * as React from 'react'
import { ServiceList, Service } from '../../../../../types/admin/service'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteServiceAction, setAlertServiceShowAction } from '../../../../../actions/admin/service'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import { booleanToIndonesiaText } from '../../../../../helpers/utils'

type OwnProps = {
    index: number,
    item: ServiceList,
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
                props.deleteServiceAction(id)
                .then((response: ApiResponse<Service>) => {
                    props.fetch(1);

                    props.setAlertServiceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Service>) => {
                    props.setLoader(false)

                    props.setAlertServiceShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>{props.item.code}</td>
            <td>{booleanToIndonesiaText(props.item.canBeMultiple)}</td>
            <td>{booleanToIndonesiaText(props.item.passangerWithDriver)}</td>
            <td>{props.item.maxServiceDistanceInKm}</td>
            <td>
                <Link to={`/admin/service/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteServiceAction: (id: number) => Promise<ApiResponse<Service>>,
    setAlertServiceShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteServiceAction: (id: number) => dispatch(deleteServiceAction(id)),
        setAlertServiceShowAction: (message: string, color: string) => dispatch(setAlertServiceShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
