import * as React from 'react'
import { ProvinceList, Province } from '../../../../../../types/admin/region/province'
import { Button } from 'reactstrap'
import { deleteProvinceAction, setAlertProvinceShowAction } from '../../../../../../actions/admin/region/province'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = RouteComponentProps & {
    index: number,
    item: ProvinceList,
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
                props.deleteProvinceAction(id)
                .then((response: ApiResponse<Province>) => {
                    props.setAlertProvinceShowAction("Data Berhasil Dihapus", 'success');
                    props.history.push(props.location.pathname);
                    props.fetch(1);
                    props.setLoader(false);
                })
                .catch( (error: ApiResponse<Province>) => {
                    props.setLoader(false)

                    props.setAlertProvinceShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <a href={`/admin/region/province/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteProvinceAction: (id: number) => dispatch(deleteProvinceAction(id)),
    setAlertProvinceShowAction: (message: string, color: string) => dispatch(setAlertProvinceShowAction(message, color)),
});

export default withRouter(connect(null, mapDispatchToProps)(TableItem));
