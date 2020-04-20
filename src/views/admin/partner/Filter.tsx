import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input,
    Modal,
    FormGroup
} from 'reactstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../types';
import { fetchPartnerFilteredAction } from '../../../actions/admin/partner';
import { Filter as IFilter } from '../../../types/admin/partner';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    name: string,
    companyName: string,
    startWorkingTogether: Date | null,
    endWorkingTogether: Date | null,
    email: string,
    phoneNumber: string,
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        name: '',
        companyName: '',
        startWorkingTogether: null,
        endWorkingTogether: null,
        email: '',
        phoneNumber: '',
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            name: '',
            companyName: '',
            startWorkingTogether: null,
            endWorkingTogether: null,
            email: '',
            phoneNumber: '',
        }

        if (this.state.modal_visible) {

            filter = {
                ...filter,
                name: this.state.name,
                companyName: this.state.companyName,
                startWorkingTogether: this.state.startWorkingTogether,
                endWorkingTogether: this.state.endWorkingTogether,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
            }
        } else {
            filter = {
                ...filter,
                companyName: this.state.companyName
            }
        }

        this.props.fetchPartnerFilteredAction(filter).then(() => {
            this.setState({
                filtered: true,
                modal_visible: false
            })
        });
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        this.setState({
            ...this.state,
            [id]: value
        });
    }

    clearFilter = () => {
        let filter: IFilter = {
            name: '',
            companyName: '',
            startWorkingTogether: null,
            endWorkingTogether: null,
            email: '',
            phoneNumber: '',
        }

        this.props.fetchPartnerFilteredAction(filter).then(() => {
            this.setState({
                name: '',
                companyName: '',
                startWorkingTogether: null,
                endWorkingTogether: null,
                email: '',
                phoneNumber: '',
                filtered: false
            })
        });
    }

    modalOnChange = (status: boolean) => {
        this.setState({
            modal_visible: status
        })
    }

    render() {
        return (
            <>
                <Form onSubmit={this.handleOnSubmit}>
                    <Row>
                        <Col xs="auto">
                            <Button type="button" color="primary" size="sm" onClick={() => this.modalOnChange( ! this.state.modal_visible)}>
                                <i className="fa fa-filter" />
                            </Button>
                        </Col>
                        <Col>
                            <InputGroup>
                                <Input 
                                    className=""
                                    id="input-companyName"
                                    placeholder="Nama"
                                    type="text"
                                    name="companyName"
                                    maxLength={255}
                                    value={this.state.companyName}
                                    onChange={this.handleOnChange}
                                    bsSize="sm"
                                />
                                <InputGroupAddon addonType="append">
                                    <Button type="submit" color="primary" size="sm">
                                        <i className="fa fa-search" /> Cari
                                    </Button>
                                    { this.state.filtered ? (
                                        <Button
                                            type="button"
                                            color="danger"
                                            size="sm"
                                            onClick={this.clearFilter}
                                            >
                                            <i className="fa fa-times" /> Reset
                                        </Button> ) : null
                                    }
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.modal_visible}
                    toggle={() => this.modalOnChange( ! this.state.modal_visible)}
                >
                    <Form onSubmit={this.handleOnSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                            Filter
                            </h5>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.modalOnChange(false)}
                            >
                            <span aria-hidden={true}>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-companyName"
                                >
                                    Nama Perusahaan
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-companyName"
                                placeholder="Nama Perusahaan"
                                type="text"
                                name="companyName"
                                maxLength={255}
                                value={this.state.companyName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                    Email
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="Email"
                                type="text"
                                name="email"
                                maxLength={255}
                                value={this.state.email}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-name"
                                >
                                    Penanggung Jawab
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-name"
                                placeholder="Penanggung Jawab"
                                type="text"
                                name="name"
                                maxLength={255}
                                value={this.state.name}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-phoneNumber"
                                >
                                    Nomor Telepon
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-phoneNumber"
                                placeholder="Nomor Telepon"
                                type="text"
                                name="phoneNumber"
                                maxLength={255}
                                value={this.state.phoneNumber}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-startWorkingTogether"
                                >
                                    Waktu Mulai
                                </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.startWorkingTogether}
                                        onChange={date => {
                                            this.setState({
                                                ...this.state,
                                                startWorkingTogether: date
                                            })
                                        }}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
                                        required
                                        />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-endWorkingTogether"
                                >
                                    Waktu Berakhir
                                </label>
                                <div>
                                    <DatePicker
                                        selected={this.state.endWorkingTogether}
                                        onChange={date => {
                                            this.setState({
                                                ...this.state,
                                                endWorkingTogether: date
                                            })
                                        }}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
                                        required
                                        />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="modal-footer">
                            <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.modalOnChange(false)}
                            >
                                Tutup
                            </Button>
                            <Button color="primary">
                                Filter
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </>
        )
    }
}

interface LinkDispatchToProps {
    fetchPartnerFilteredAction: (filter: IFilter) => Promise<Boolean>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchPartnerFilteredAction: (filter: IFilter) => dispatch(fetchPartnerFilteredAction(filter)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);