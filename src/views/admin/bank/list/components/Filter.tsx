import * as React from 'react'
import { connect } from 'react-redux'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input
} from 'reactstrap'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { fetchBankAction, setFilterAction, clearFilterAction } from '../../../../../actions/admin/bank';
import { Filter as IFilter, FilterKeys } from '../../../../../types/admin/bank';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { getKeyValue } from '../../../../../helpers/utils';
import { AppState } from '../../../../../store/configureStore';

type OwnProps = RouteComponentProps

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const Filter: React.FC<Props> = (props) => {

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        let filter = props.filter as IFilter;

        let currentUrlParams = new URLSearchParams(window.location.search);

        Object.keys(filter).forEach((obj: string, index: number) => {
            currentUrlParams.set(obj, getKeyValue<FilterKeys, IFilter>(obj as FilterKeys)(filter));
        });

        props.history.push(`${window.location.pathname}?${currentUrlParams.toString()}`);

        props.fetchBankAction(1);
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
        props.fetchBankAction(1);
        props.clearFilterBankAction();
    }

    return (
        <Form onSubmit={handleOnSubmit}>
            <Row>
                <Col>
                    <InputGroup>
                        <Input 
                            className=""
                            id="input-nama"
                            placeholder="Nama"
                            type="text"
                            name="nama"
                            maxLength={255}
                            value={props.filter.nama}
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
    )
}

type LinkStateToProps = {
    filter: IFilter,
    filtered: boolean
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        filter: state.bank.filter,
        filtered: state.bank.filtered
    }
}

type LinkDispatchToProps = {
    fetchBankAction: (page: number) => Promise<Boolean>,
    setFilterAction: (filter: IFilter) => void,
    clearFilterBankAction: () => void
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        fetchBankAction: (page: number) => dispatch(fetchBankAction(page)),
        setFilterAction: (filter: IFilter) => dispatch(setFilterAction(filter)),
        clearFilterBankAction: () => dispatch(clearFilterAction())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Filter));
