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
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { 
    fetchServicePriceAction, 
    setFilterAction, 
    clearFilterAction 
} from '../../../actions/admin/servicePrice';
import { Filter as IFilter, FilterKeys} from '../../../types/admin/servicePrice';
import { getKeyValue } from '../../../helpers/utils';
import { AppState } from '../../../store/configureStore';

type FilterProps = RouteComponentProps & {

}

type Props = FilterProps & LinkStateToProps & LinkDispatchToProps;

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

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        this.props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        this.props.fetchServicePriceAction(1);

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

    clearFilter = () => {
        this.props.history.push(`${window.location.pathname}`);
        this.props.fetchServicePriceAction(1);
        this.props.clearFilterServicePriceAction();
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
                                    id="input-districtName"
                                    placeholder="Kabupaten/ Kota"
                                    type="text"
                                    name="districtName"
                                    maxLength={255}
                                    value={this.props.filter.districtName}
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
                                htmlFor="input-districtName"
                                >
                                    Kabupaten/ Kota
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-districtName"
                                placeholder="Kabupaten/ Kota"
                                type="text"
                                name="districtName"
                                maxLength={255}
                                value={this.props.filter.districtName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            {/* <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-service"
                                >
                                    Layanan
                                </label>
                                <ReactSelectAsyncPaginate 
                                    value={this.state.service}
                                    loadOptions={this.loadServiceHandler}
                                    onChange={(option) => {
                                        if (option) {
                                            this.setState({
                                                vehicleType: {
                                                    ...this.state.vehicleType,
                                                    ...(option as OptionsType<{
                                                        value: number;
                                                        label: string;
                                                    }>)
                                                }
                                            })
                                        }
                                    }}
                                    additional={{
                                        page: 1
                                    }}
                                    debounceTimeout={250}
                                />
                            </FormGroup> */}
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

interface LinkStateToProps {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.servicePrice.filter,
        filtered: state.servicePrice.filtered
    }
}

interface LinkDispatchToProps {
    fetchServicePriceAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterServicePriceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchServicePriceAction: (page: number) => dispatch(fetchServicePriceAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterServicePriceAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));