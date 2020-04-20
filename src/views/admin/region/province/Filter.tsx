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
import { AppActions } from '../../../../types';
import { fetchProvinceFilteredAction } from '../../../../actions/admin/region/province';
import { Filter as IFilter } from '../../../../types/admin/region/province';

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    name: string,
    countryName: string,
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        name: '',
        countryName: '',
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            name: '',
            countryName: '',
        }

        if (this.state.modal_visible) {
            filter = {
                ...filter,
                name: this.state.name,
                countryName: this.state.countryName
            }
        } else {
            filter = {
                ...filter,
                name: this.state.name
            }
        }

        this.props.fetchProvinceFilteredAction(filter).then(() => {
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
            countryName: '',
        }

        this.props.fetchProvinceFilteredAction(filter).then(() => {
            this.setState({
                name: '',
                countryName: '',
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
                                htmlFor="input-countryName"
                                >
                                    Negara
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-countryName"
                                placeholder="Negara"
                                type="text"
                                name="countryName"
                                maxLength={255}
                                value={this.state.countryName}
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
    fetchProvinceFilteredAction: (filter: IFilter) => Promise<Boolean>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchProvinceFilteredAction: (filter: IFilter) => dispatch(fetchProvinceFilteredAction(filter)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);