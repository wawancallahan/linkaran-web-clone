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
import { fetchFoodFilteredAction } from '../../../actions/admin/food';
import { Filter as IFilter } from '../../../types/admin/food';

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    name: string,
    provinceName: string,
    districtName: string,
    restaurantName: string,
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        name: '',
        provinceName: '',
        districtName: '',
        restaurantName: '',
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            name: '',
            provinceName: '',
            districtName: '',
            restaurantName: '',
        }

        if (this.state.modal_visible) {
            filter = {
                ...filter,
                name: this.state.name,
                provinceName: this.state.provinceName,
                districtName: this.state.districtName,
                restaurantName: this.state.restaurantName
            }
        } else {
            filter = {
                ...filter,
                name: this.state.name
            }
        }

        this.props.fetchFoodFilteredAction(filter).then(() => {
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
            provinceName: '',
            districtName: '',
            restaurantName: ''
        }

        this.props.fetchFoodFilteredAction(filter).then(() => {
            this.setState({
                name: '',
                provinceName: '',
                districtName: '',
                restaurantName: '',
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
                                    id="input-name"
                                    placeholder="Nama"
                                    type="text"
                                    name="name"
                                    maxLength={255}
                                    value={this.state.name}
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
                                value={this.state.name}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-provinceName"
                                >
                                    Nama Provinsi
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-provinceName"
                                placeholder="Nama Provinsi"
                                type="text"
                                name="provinceName"
                                maxLength={255}
                                value={this.state.provinceName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-districtName"
                                >
                                    Nama Kota/Kabupaten
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-districtName"
                                placeholder="Nama"
                                type="text"
                                name="districtName"
                                maxLength={255}
                                value={this.state.districtName}
                                onChange={this.handleOnChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-restaurantName"
                                >
                                    Restoran
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-restaurantName"
                                placeholder="Restoran"
                                type="text"
                                name="restaurantName"
                                maxLength={255}
                                value={this.state.restaurantName}
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
    fetchFoodFilteredAction: (filter: IFilter) => Promise<Boolean>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchFoodFilteredAction: (filter: IFilter) => dispatch(fetchFoodFilteredAction(filter)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);