import * as React from 'react'
import { PriceList, Price } from '../../../../../types/admin/price'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deletePriceAction, setAlertPriceShowAction } from '../../../../../actions/admin/price'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';

type OwnProps = {
    index: number,
    item: PriceList,
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
                props.deletePriceAction(id)
                .then((response: ApiResponse<Price>) => {
                    props.fetch(1);

                    props.setAlertPriceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (error: ApiResponse<Price>) => {
                    props.setLoader(false)

                    props.setAlertPriceShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.basePrice} /></td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.perKilometer} /></td>
            <td>{props.item.minKm}</td>
            <td>
                <Link to={`/admin/price/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </Link>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

type LinkDispatchToProps = {
    deletePriceAction: (id: number) => Promise<ApiResponse<Price>>,
    setAlertPriceShowAction: (message: string, color: string) => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deletePriceAction: (id: number) => dispatch(deletePriceAction(id)),
        setAlertPriceShowAction: (message: string, color: string) => dispatch(setAlertPriceShowAction(message, color))
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
