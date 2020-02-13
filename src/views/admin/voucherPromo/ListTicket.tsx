import React, { Component } from 'react'

import {
    Card,
    CardBody,
    CardHeader,
    Row,
    Col,
    Table,
    CardFooter,
    Button,
    Modal,
    Form as FormReactStrap,
    FormGroup,
    Input
} from 'reactstrap'

import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { AppState } from '../../../store/configureStore';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';

import Pagination from '../../../components/Pagination/Pagination'
import { VoucherPromo } from '../../../types/admin/voucherPromo';
import { Ticket, FormField, TicketCreate, TicketCreateResult } from '../../../types/admin/ticket';
import { Paginator } from '../../../types/paginator';
import { fetchTicketVoucherAction, createTicketAction } from '../../../actions/admin/ticket';
import Spinner from '../../../components/Loader/Spinner'
import { parseDateTimeFormat } from '../../../helpers/parseData';
import queryString from 'query-string';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApiResponse } from '../../../types/api';
import { ModalToggleVisible } from '../../../types/modal';

type ListTicketProps = RouteComponentProps & {
    data: VoucherPromo | null
}

type Props = ListTicketProps & LinkStateToProps & LinkDispatchToProps

type State = {
    loader: boolean,
    modal_add_visible: boolean,
    modal_edit_visible: ModalToggleVisible,
    form: FormField,
    voucherId: string,
    modalState: string
    alert_visible: boolean,
    alert_message: string
}

const TableItem = (props: {
    index: number,
    item: Ticket,
    key: number
}) => {
    return (
        <tr>
            <td>{props.item.redeemCode}</td>
            <td>{parseDateTimeFormat(props.item.claimAt)}</td>
            <Button color="warning" size="sm">
                <i className="fa fa-edit"></i>
            </Button>
            <Button color="danger" size="sm">
                <i className="fa fa-trash"></i>
            </Button>
        </tr>
    )
}

const TableItemEmpty = () => (
    <tr>
        <td colSpan={4}>Data Tidak Ditemukan</td> 
    </tr>
);

const createSchema = Yup.object().shape({
    redeemCode: Yup.string()
            .test('len', 'Bidang isian kode tidak boleh lebih dari 255 karakter', (val: any): boolean => {
                if (val) {
                    return val.length <= 255;
                }

                return true;
            })
            .required('Bidang isian kode wajib diisi'),
})

class ListTicket extends Component<Props, State> {

    state = {
        loader: false,
        modal_add_visible: false,
        modal_edit_visible: {},
        form: {
            redeemCode: '',
        },
        voucherId: '',
        modalState: 'create',
        alert_visible: false,
        alert_message: ''
    }

    componentDidMount() {
        const queryStringValue = queryString.parse(this.props.location.search);
    
        const page = + (queryStringValue.page || 1);

        if (this.props.data) {
            this.fetchTicketVoucherList(page, this.props.data.id);
        }
    }

    fetchTicketVoucherList = (page: number, id: number) => {
        this.setState({
            loader: true
        }, () => {
            this.props.fetchTicketVoucherAction(page, id).then(() => {
                this.setState({
                    loader: false
                })
            });
        })
    }

    toggleAddModalTicket = () => {
        this.setState( (prevState: State) => {
            return {
                modal_add_visible: ! prevState.modal_add_visible
            }
        })
    }

    toggleEditModelTicket = (id: number) => {
        this.setState((prevState: State) => {

            let modal_edit_visible = {
                ...prevState.modal_edit_visible
            };

            if ( ! (id in modal_edit_visible))  {

                const new_modal_visible: ModalToggleVisible = {
                    [id]: true
                }

                modal_edit_visible = {
                    ...modal_edit_visible,
                    ...new_modal_visible
                }
            } else {
                modal_edit_visible[id] = ! prevState.modal_edit_visible[id]
            }

            return {
                modal_edit_visible: modal_edit_visible
            }
        });
    }

    setAlertMessage = (message: string) => {
        this.setState({
            alert_message: message
        });
    }

    setAlertOpen = (open: boolean) => {
        this.setState({
            alert_visible: open
        })
    }

    render () {

        let ticketVoucherList: any = null

        let loaderSpinner = <Spinner type="Puff"
                                color="#00BFFF"
                                height={150}
                                width={150}
                                visible={this.state.loader} />

        if ( ! this.state.loader) {
            if (this.props.ticketVoucherList.length > 0) {
                ticketVoucherList = this.props.ticketVoucherList.map((item: Ticket, index: number) => (
                    <TableItem key={index}
                               item={item}
                               index={index}
                               />
                ));
            } else {
                ticketVoucherList = <TableItemEmpty />;
            }
        }

        return (
            <>
                <Card className="shadow">
                    <CardHeader className="border-0">
                        <Row className="align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Daftar Tiket</h3>
                            </div>
                            <div className="col text-right">
                                <Button
                                    color="primary"
                                    size="sm"
                                >
                                    Tambah Tiket
                                </Button>
                            </div>
                        </Row>
                    </CardHeader>

                    <Table className="align-items-center table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <th>Kode</th>
                                <th>Tanggal Digunakan</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketVoucherList}
                        </tbody>
                    </Table>
                    
                    {loaderSpinner}
                    
                    <CardFooter className="py-4">
                        <Pagination pageCount={this.props.paginate.pageCount}
                                        currentPage={this.props.paginate.currentPage}
                                        itemCount={this.props.paginate.itemCount}
                                        itemClicked={(page: number) => {
                                            if (this.props.data) {
                                                this.fetchTicketVoucherList(page, this.props.data.id)   
                                            }
                                        }} />
                    </CardFooter>
                </Card>

                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.modal_add_visible}
                    toggle={() => this.toggleAddModalTicket()}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="modal-ticket">
                            Tambah Tiket
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleAddModalTicket()}
                            >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Formik initialValues={this.state.form}
                                onSubmit={(values, action) => {
                                    this.setAlertOpen(false)

                                    switch (this.state.modalState) {
                                        case 'create':
                                                const ticketForm: TicketCreate = {
                                                    redeemCode: values.redeemCode,
                                                    voucher: {
                                                        id: Number.parseInt(this.state.voucherId)
                                                    }
                                                }

                                                this.props.createTicketAction(ticketForm)
                                            break;
                                        case 'edit':
                                            
                                            break;
                                        default:
                                            action.setSubmitting(false)
                                    }
                                }}
                                validationSchema={createSchema}>
                            {(FormikProps => {
                                return (
                                    <FormReactStrap onSubmit={FormikProps.handleSubmit} formMethod="POST">
                                        <div className="pl-lg-4">
                                            <FormGroup>
                                                <label
                                                className="form-control-label"
                                                htmlFor="input-code"
                                                >
                                                    Kode
                                                </label>
                                                <Input
                                                    className="form-control-alternative"
                                                    id="input-code"
                                                    placeholder="Kode"
                                                    type="text"
                                                    name="code"
                                                    maxLength={255}
                                                    value={FormikProps.values.redeemCode}
                                                    required
                                                    onChange={FormikProps.handleChange}
                                                    onBlur={FormikProps.handleBlur}
                                                    invalid={ !!(FormikProps.touched.redeemCode && FormikProps.errors.redeemCode) }
                                                />
                                                <div>
                                                    {FormikProps.errors.redeemCode && FormikProps.touched.redeemCode ? FormikProps.errors.redeemCode : ''}
                                                </div>
                                            </FormGroup>
                                        </div>
                                    </FormReactStrap>
                                );
                            })}
                        </Formik>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleAddModalTicket()}
                        >
                            Tutup
                        </Button>
                        <Button color="primary" type="button">
                            Tambah
                        </Button>
                    </div>
                </Modal>
            </>
        )
    }
}

interface LinkStateToProps {
    ticketVoucherList: Ticket[],
    paginate: Paginator,
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        ticketVoucherList: state.ticketVoucher.list,
        paginate: state.ticketVoucher.paginate,
    }
}

interface LinkDispatchToProps {
    fetchTicketVoucherAction: (page: number, id: number) => Promise<Boolean>,
    createTicketAction: (ticket: TicketCreate) => Promise<ApiResponse<TicketCreateResult>>
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: ListTicketProps): LinkDispatchToProps => {
    return {
        fetchTicketVoucherAction: (page: number, id: number) => dispatch(fetchTicketVoucherAction(page, id)),
        createTicketAction: (ticket: TicketCreate) => dispatch(createTicketAction(ticket))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListTicket))