import * as React from 'react'
import { ApplicationList, Application } from '../../../../../../types/admin/transaction/application'
import { deleteApplicationAction, setAlertApplicationShowAction, cancelOrderAction } from '../../../../../../actions/admin/transaction/application'
import { ThunkDispatch } from 'redux-thunk'
import { AppActions } from '../../../../../../types'
import { connect } from 'react-redux'
import { ApiResponse } from '../../../../../../types/api'
import { Badge, Button } from 'reactstrap'
import NumberFormat from 'react-number-format'
import { colorStatusFormat } from '../../../../../../helpers/utils'
import swal from 'sweetalert'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'

type OwnProps = RouteComponentProps & {
    index: number,
    item: ApplicationList,
    key: number,
    fetch: (page: number) => void,
    setLoader: React.Dispatch<React.SetStateAction<boolean>>,
    type: string
}

type Props = OwnProps & ReturnType<typeof mapDispatchToProps>

const TableItem: React.FC<Props> = (props) => {
    const cancelOrder = (numberTransaction: string) => {
        swal("Apakah anda yakin?", "Data Order yang dicancel tidak dapat dikembalikan!", {
            dangerMode: true,
            buttons: ["Tutup!", true],
            icon: "warning",
        }).then((willDelete) => {
            if (willDelete) {
                props.setLoader(true)
                props.cancelOrderAction(numberTransaction)
                .then((response: ApiResponse<Application>) => {
                    props.setAlertApplicationShowAction("Data Order Berhasil Dicancel", 'success');

                    const querySearch = queryString.parse(props.location.search)
                    querySearch.page = "1"

                    props.history.push({
                        pathname: props.location.pathname,
                        search: queryString.stringify(querySearch)
                    });
                    props.fetch(1);
                    props.setLoader(false);
                })
                .catch( (error: ApiResponse<Application>) => {
                    props.setLoader(false)

                    props.setAlertApplicationShowAction(error.error!.metaData.message, 'danger');
                });
            }
        })
    }

    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{props.item.date}</td>
            <td>{props.item.numberTransaction}</td>
            <td>{props.item.costumerName}</td>
            <td>{props.item.driverName}</td>
            <td>
                <Badge color="success">{props.item.service}</Badge>
            </td>
                <td><NumberFormat displayType={'text'} thousandSeparator={true} prefix={'Rp. '} value={props.item.totalCost} /></td>
            <td>
                <Badge color={colorStatusFormat(props.item.status)}>{props.item.status}</Badge>
            </td>
            <td>
                <a href={`/admin/transaction/application/${props.type}/${props.item.numberTransaction}`} className="btn btn-info btn-sm">
                    <i className="fa fa-eye"></i>
                </a>
                {props.type == 'inorder' && (
                    <Button color="danger" size="sm" onClick={() => cancelOrder(props.item.numberTransaction)}>
                        <i className="fa fa-times"></i> Cancel
                    </Button>
                )}
            </td>
        </tr>
    )
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps) => ({
    cancelOrderAction: (numberTransaction: string) => dispatch(cancelOrderAction(numberTransaction)),
    deleteApplicationAction: (id: number) => dispatch(deleteApplicationAction(id)),
    setAlertApplicationShowAction: (message: string, color: string) => dispatch(setAlertApplicationShowAction(message, color)),
});

export default withRouter(connect(null, mapDispatchToProps)(TableItem))
