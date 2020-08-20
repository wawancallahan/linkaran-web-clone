import * as React from 'react'
import { 
    InputGroupAddon, 
    Col, 
    Row, 
    Form, 
    InputGroup, 
    Button, 
    Input
} from 'reactstrap'
import { Filter as IFilter, FilterKeys } from '../../../../../types/admin/bank';
import {
    RouteComponentProps,
    withRouter
} from 'react-router-dom';
import { createFormSearch, OptionObjectString } from '../../../../../helpers/utils';
import queryString from "query-string";

type OwnProps = RouteComponentProps

type Props = OwnProps

const Filter: React.FC<Props> = (props) => {

    const [filtered, setFiltered] = React.useState(false);
    const [formField, setFormField] = React.useState<IFilter>({
        nama: ''
    });

    React.useEffect(() => {
        const querySearch = queryString.parse(props.location.search);

        if (Object.keys(querySearch).length > 0) {
            setFiltered(true);
        }

        setFormField({
            nama: decodeURIComponent((querySearch.nama as string) || "")
        });
    }, []);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let filter = formField;

        createFormSearch(props.location.pathname, {
            ...filter
        } as OptionObjectString);
    }
    
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        const id = e.currentTarget.name;
    
        setFormField(prevState => {
            return {
                ...prevState,
                [id]: value
            }
        });
    }

    const clearFilter = () => {
        createFormSearch(props.location.pathname);
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
                            value={formField.nama}
                            onChange={handleOnChange}
                            bsSize="sm"
                        />
                        <InputGroupAddon addonType="append">
                            <Button type="submit" color="primary" size="sm">
                                <i className="fa fa-search" /> Cari
                            </Button>
                            { filtered ? (
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

export default withRouter(Filter);
