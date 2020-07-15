import * as React from 'react'
import { DistrictList, District } from '../../../../../../types/admin/region/district'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteDistrictAction, setAlertDistrictShowAction } from '../../../../../../actions/admin/region/district'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: DistrictList,
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
                props.deleteDistrictAction(id)
                .then((response: ApiResponse<District>) => {
                    props.fetch(1);

                    props.setAlertDistrictShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<District>) => {
                    props.setLoader(false)

                    props.setAlertDistrictShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/district/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteDistrictAction: (id: number) => Promise<ApiResponse<District>>,
    setAlertDistrictShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteDistrictAction: (id: number) => dispatch(deleteDistrictAction(id)),
        setAlertDistrictShowAction: (message: string, color: string) => dispatch(setAlertDistrictShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
