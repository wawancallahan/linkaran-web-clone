import * as React from 'react'
import { PriceList, Price } from '../../../../../types/admin/price'
import { Button } from 'reactstrap'
import { deletePriceAction, setAlertPriceShowAction } from '../../../../../actions/admin/price'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = RouteComponentProps & {
    index: number,
    item: PriceList,
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
                props.deletePriceAction(id)
                .then((response: ApiResponse<Price>) => {
                    props.setAlertPriceShowAction("Data Berhasil Dihapus", 'success');
                    props.history.push(props.location.pathname);
                    props.fetch(1);
                    props.setLoader(false);
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
                <a href={`/admin/price/${props.item.id}/edit`} className="btn btn-warning btn-sm">
                    <i className="fa fa-edit"></i>
                </a>
                <Button color="danger" size="sm" onClick={() => deleteItem(props.item.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    deletePriceAction: (id: number) => dispatch(deletePriceAction(id)),
    setAlertPriceShowAction: (message: string, color: string) => dispatch(setAlertPriceShowAction(message, color))
});

export default withRouter(connect(null, mapDispatchToProps)(TableItem));
