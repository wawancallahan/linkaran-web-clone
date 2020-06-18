import * as React from 'react'
import { connect } from 'react-redux'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input,
    FormGroup,
    Modal
} from 'reactstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../../types';
import { fetchProvinceAction, setFilterAction, clearFilterAction } from '../../../../../../actions/admin/region/province';
import { Filter as IFilter, FilterKeys } from '../../../../../../types/admin/region/province';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { getKeyValue } from '../../../../../../helpers/utils';
import { AppState } from '../../../../../../store/configureStore';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const Filter: React.FC<Props> = (props) => {

    const [modalVisible, setModalVisible] = React.useState(false)

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = props.filter as IFilter;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        props.fetchProvinceAction(1);
    }

    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        props.setFilterAction({
            ...props.filter,
            [id]: value
        } as IFilter);
    }

    const clearFilter = () => {
        props.history.push(`${window.location.pathname}`);
        props.fetchProvinceAction(1);
        props.clearFilterProvinceAction();
    }

    const modalOnChange = (visible: boolean) => {
        setModalVisible(visible)
    }

    return (
        <React.Fragment>
            <Form onSubmit={handleOnSubmit}>
                <Row>
                    <Col xs="auto">
                        <Button type="button" color="primary" size="sm" onClick={() => modalOnChange( ! modalVisible)}>
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
                                value={props.filter.name}
                                onChange={handleOnChange}
                                bsSize="sm"
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit" color="primary" size="sm">
                                    <i className="fa fa-search" /> Cari
                                </Button>
                                { props.filtered ? (
                                    <Button
                                        type="button"
                                        color="danger"
                                        size="sm"
                                        onClick={clearFilter}
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
                isOpen={modalVisible}
                toggle={() => modalOnChange( ! modalVisible)}
            >
                <Form onSubmit={handleOnSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Filter
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => modalOnChange(false)}
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
                            value={props.filter.name}
                            onChange={handleOnChange}
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
                            value={props.filter.countryName}
                            onChange={handleOnChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                        color="secondary"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => modalOnChange(false)}
                        >
                            Tutup
                        </Button>
                        <Button color="primary">
                            Filter
                        </Button>
                    </div>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

type LinkStateToProps = {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.province.filter,
        filtered: state.province.filtered
    }
}

type LinkDispatchToProps = {
    fetchProvinceAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterProvinceAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchProvinceAction: (page: number) => dispatch(fetchProvinceAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterProvinceAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
