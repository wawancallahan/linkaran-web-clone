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
import { fetchCountryFilteredAction } from '../../../../actions/admin/region/country';
import { Filter as IFilter } from '../../../../types/admin/region/country';

type FilterProps = {

}

type Props = LinkDispatchToProps;

type State = {
    name: string,
    filtered: boolean,
    modal_visible: boolean
}

class Filter extends Component<Props, State> {

    state = {
        name: '',
        filtered: false,
        modal_visible: false
    }

    handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter: IFilter = {
            name: this.state.name
        }

        this.props.fetchCountryFilteredAction(filter).then(() => {
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
        }

        this.props.fetchCountryFilteredAction(filter).then(() => {
            this.setState({
                name: '',
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
            </>
        )
    }
}

interface LinkDispatchToProps {
    fetchCountryFilteredAction: (filter: IFilter) => Promise<Boolean>,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: FilterProps): LinkDispatchToProps => {
    return {
        fetchCountryFilteredAction: (filter: IFilter) => dispatch(fetchCountryFilteredAction(filter)),
    }
}

export default connect(null, mapDispatchToProps)(Filter);