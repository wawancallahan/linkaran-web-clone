import * as React from 'react'
import { CountryList, Country } from '../../../../../../types/admin/region/country'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteCountryAction, setAlertCountryShowAction } from '../../../../../../actions/admin/region/country'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import swal from 'sweetalert'

type OwnProps = {
    index: number,
    item: CountryList,
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
                props.deleteCountryAction(id)
                .then((response: ApiResponse<Country>) => {
                    props.fetch(1);

                    props.setAlertCountryShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Country>) => {
                    props.setLoader(false)

                    props.setAlertCountryShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.name}</td>
            <td>
                <Link to={`/admin/region/country/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteCountryAction: (id: number) => Promise<ApiResponse<Country>>,
    setAlertCountryShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteCountryAction: (id: number) => dispatch(deleteCountryAction(id)),
        setAlertCountryShowAction: (message: string, color: string) => dispatch(setAlertCountryShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
