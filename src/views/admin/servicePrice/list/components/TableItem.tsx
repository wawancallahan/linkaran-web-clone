import * as React from 'react'
import { ServicePriceList, ServicePrice } from '../../../../../types/admin/servicePrice'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { deleteServicePriceAction, setAlertServicePriceShowAction } from '../../../../../actions/admin/servicePrice'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../types/api'
import swal from 'sweetalert'
import NumberFormat from 'react-number-format';

type OwnProps = {
    index: number,
    item: ServicePriceList,
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
                props.deleteServicePriceAction(id)
                .then((response: ApiResponse<ServicePrice>) => {
                    props.fetch(1);

                    props.setAlertServicePriceShowAction("Data Berhasil Dihapus", 'success');
                })
                .catch( (response: ApiResponse<ServicePrice>) => {
                    props.setAlertServicePriceShowAction(response.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.basePrice} /></td>
            <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.pricePerKm} /></td>
            <td>{props.item.minKm}</td>
            <td>{props.item.district ? props.item.district.name : ''}</td>
            <td>{props.item.service ? props.item.service.name : ''}</td>
            <td>{props.item.vehicleType ? props.item.vehicleType.name : ''}</td>
            <td>
                <Link to={`/admin/service-price/${props.item.id}/edit`} className="btn btn-warning btn-sm">
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
    deleteServicePriceAction: (id: number) => Promise<ApiResponse<ServicePrice>>,
    setAlertServicePriceShowAction: (message: string, color: string) => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        deleteServicePriceAction: (id: number) => dispatch(deleteServicePriceAction(id)),
        setAlertServicePriceShowAction: (message: string, color: string) => dispatch(setAlertServicePriceShowAction(message, color)),
    }
}

export default connect(null, mapDispatchToProps)(TableItem)
