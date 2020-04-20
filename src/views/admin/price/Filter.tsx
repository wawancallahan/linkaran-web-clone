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
import { fetchPriceFilteredAction } from '../../../actions/admin/price';
import { Filter as IFilter } from '../../../types/admin/price';

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    basePrice: string,
    perKilometer: string,
    minKm: string,
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        basePrice: '',
        perKilometer: '',
        minKm: '',
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            basePrice: '',
            perKilometer: '',
            minKm: '',
        }

        if (this.state.modal_visible) {
            filter = {
                ...filter,
                basePrice: this.state.basePrice,
                perKilometer: this.state.perKilometer,
                minKm: this.state.minKm,
            }
        } else {
            filter = {
                ...filter,
                basePrice: this.state.basePrice
            }
        }

        this.props.fetchPriceFilteredAction(filter).then(() => {
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
            basePrice: '',
            perKilometer: '',
            minKm: '',
        }

        this.props.fetchPriceFilteredAction(filter).then(() => {
            this.setState({
                basePrice: '',
                perKilometer: '',
                minKm: '',
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
                                    id="input-basePrice"
                                    placeholder="Harga Dasar"
                                    type="text"
                                    name="basePrice"
                                    maxLength={255}
                                    value={this.state.basePrice}
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
                                htmlFor="input-basePrice"
                                >
                                    Harga Dasar
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-basePrice"
                                placeholder="Harga Dasar"
                                type="text"
                                name="basePrice"
                                maxLength={255}
                                value={this.state.basePrice}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-perKilometer"
                                >
                                    Harga Per Kilometer
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-perKilometer"
                                placeholder="Harga Per Kilometer"
                                type="text"
                                name="perKilometer"
                                maxLength={255}
                                value={this.state.perKilometer}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-minKm"
                                >
                                   Minimal Jarak Tempuh
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-minKm"
                                placeholder="Minimal Jarak Tempuh"
                                type="text"
                                name="minKm"
                                maxLength={255}
                                value={this.state.minKm}
                                onChange={this.handleOnChange}
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

interface LinkDispatchToProps {
    fetchPriceFilteredAction: (filter: IFilter) => Promise<Boolean>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchPriceFilteredAction: (filter: IFilter) => dispatch(fetchPriceFilteredAction(filter)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);