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
import { setFilterAction, clearFilterAction, fetchServiceAction } from '../../../actions/admin/service';
import { Filter as IFilter, FilterKeys } from '../../../types/admin/service';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { OptionObjectString, getKeyValue, setUrlParams } from '../../../helpers/utils';
import { AppState } from '../../../store/configureStore';
import ReactSelect, { OptionsType, ValueType } from 'react-select'

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

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        this.props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        this.props.fetchServiceAction(1);

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

    handleOnChangeSelect = (option: {
        value: string,
        label: string
    }, id: string) => {
        this.props.setFilterAction({
            ...this.props.filter,
            [id]: option.value
        } as IFilter);
    }

    clearFilter = () => {
        this.props.history.push(`${window.location.pathname}`);
        this.props.fetchServiceAction(1);
        this.props.clearFilterServiceAction();
    }

    modalOnChange = (status: boolean) => {
        this.setState({
            modal_visible: status
        })
    }

    updateToOptionSelect = (value: string) => {
        let label = ''

        if (value !== '') {
            switch (value) {
                case '1': label = 'Ya'; break
                case '0': label = 'Tidak'; break
            }
        }
        
        return {
            value: value,
            label: label
        } as ValueType<{
            value: string,
            label: string
        }>
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
                                    id="input-name"
                                    placeholder="Nama"
                                    type="text"
                                    name="name"
                                    maxLength={255}
                                    value={this.props.filter.name}
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
                                htmlFor="input-name"
                                >
                                    Nama
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-name"
                                placeholder="Nama"
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
                                value={this.props.filter.code}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-canBeMultiple"
                                >
                                    Dapat Lebih Dari 1
                                </label>
                                <ReactSelect 
                                    options={[
                                        {value: '1', label: 'Ya'},
                                        {value: '0', label: 'Tidak'}
                                    ]}
                                    defaultValue={this.updateToOptionSelect(this.props.filter.canBeMultiple)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'canBeMultiple')
                                    }}  
                                    />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-passangerWithDriver"
                                >
                                    Penumpang Dengan Driver
                                </label>
                                <ReactSelect 
                                    options={[
                                        {value: '1', label: 'Ya'},
                                        {value: '0', label: 'Tidak'}
                                    ]}
                                    defaultValue={this.updateToOptionSelect(this.props.filter.passangerWithDriver)}
                                    onChange={(option) => {

                                        const optionSelected = option as {
                                            value: string,
                                            label: string
                                        };

                                        this.handleOnChangeSelect(optionSelected, 'passangerWithDriver')
                                    }}  
                                    />
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
        filter: state.service.filter,
        filtered: state.service.filtered
    }
}

type LinkDispatchToProps = {
    fetchServiceAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterServiceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchServiceAction: (page: number) => dispatch(fetchServiceAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterServiceAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));