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
import { fetchPartnerAction, setFilterAction, clearFilterAction } from '../../../actions/admin/partner';
import { Filter as IFilter, FilterKeys, FilterOmit } from '../../../types/admin/partner';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { OptionObjectString, getKeyValue, setUrlParams } from '../../../helpers/utils';
import { AppState } from '../../../store/configureStore';
import moment from 'moment'

type FilterProps = RouteComponentProps & {

}

type Props = FilterProps & LinkDispatchToProps & LinkStateToProps;

type State = {
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = this.props.filter as IFilter;

        const startWorkingTogether = filter.startWorkingTogether && moment(filter.startWorkingTogether).isValid() ? (
            moment(filter.startWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        const endWorkingTogether = filter.endWorkingTogether && moment(filter.endWorkingTogether).isValid() ? (
            moment(filter.endWorkingTogether).format("YYYY-MM-DD")
        ) : ''

        let newFilter = {
            ...filter,
            startWorkingTogether: startWorkingTogether,
            endWorkingTogether: endWorkingTogether
        }

        let filterOmit = newFilter as FilterOmit;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filterOmit).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, FilterOmit>(obj as FilterKeys)(filterOmit));
        });

        this.props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        this.props.fetchPartnerAction(1);

        this.modalOnChange(false);
    }

    handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: value
        } as IFilter);
    }

    handleOnDateChange = (date: Date | null, id: string) => {
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: date
        } as IFilter);
    }

    clearFilter = () => {
        this.props.history.push(`${window.location.pathname}`);
        this.props.fetchPartnerAction(1);
        this.props.clearFilterPartnerAction();
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
                                    value={this.props.filter.companyName}
                                    onChange={this.handleOnChange}
                                    bsSize="sm"
                                />
                                <InputGroupAddon addonType="append">
                                    <Button type="submit" color="primary" size="sm">
                                        <i className="fa fa-search" /> Cari
                                    </Button>
                                    { this.props.filtered ? (
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
                                value={this.props.filter.companyName}
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
                                value={this.props.filter.email}
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
                                value={this.props.filter.name}
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
                                value={this.props.filter.phoneNumber}
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
                                        selected={this.props.filter.startWorkingTogether}
                                        onChange={(date) => this.handleOnDateChange(date, 'startWorkingTogether')}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
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
                                        selected={this.props.filter.endWorkingTogether}
                                        onChange={(date) => this.handleOnDateChange(date, 'endWorkingTogether')}
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-alternative"
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

type LinkStateToProps = {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.partner.filter,
        filtered: state.partner.filtered
    }
}

type LinkDispatchToProps = {
    fetchPartnerAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterPartnerAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchPartnerAction: (page: number) => dispatch(fetchPartnerAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterPartnerAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));