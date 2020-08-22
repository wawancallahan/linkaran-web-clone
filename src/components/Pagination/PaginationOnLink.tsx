import * as React from 'react';
import {
    Pagination as PaginationContainer,
    PaginationLink,
    PaginationItem
} from 'reactstrap';
import { RouteComponentProps, withRouter } from "react-router-dom";
import queryString from "query-string"
import { OptionObjectString, objectToParamsUrl } from '../../helpers/utils';

type Props = RouteComponentProps & {
    pageCount: number,
    currentPage: number,
    itemCount: number,
    url: string
}

export type Page = {
    text: string,
    active: boolean,
    disabled: boolean,
    page: number | null
}

const setSearchQuery = (query: string, page: number) => {
    
    const searchQuery = queryString.parse(query);

    const newQuery: OptionObjectString = {
        ...searchQuery,
        page: page.toString(),
    };

    return objectToParamsUrl(newQuery);
}

const Pagination: React.FC<Props> = (props: Props) => {
    const [pages, setPages] = React.useState<Page[]>([]);

    React.useEffect(() => {
        const pageList: Page[] = [];

        const current_page = props.currentPage;
        const last_page = props.pageCount;
        const side_page_limit = 2;

        const start = (current_page - side_page_limit) < 1 ? 1 : current_page - side_page_limit;
        const end = (current_page + side_page_limit) > last_page ? last_page : current_page + side_page_limit;
        
        if (start != 1) {
            pageList.push({
                text: '1', 
                active: false, 
                disabled: false,
                page: 1
            })
        }

        if (start > 2) {
            pageList.push({
                text: `...`, 
                active: false, 
                disabled: true,
                page: null
            })
        } 

        for (let page = start; page <= end; page++) {
            pageList.push({
                text: `${page}`, 
                active: page == current_page, 
                disabled: page == current_page,
                page: page
            })
        }

        if (end < last_page - 1) {
            pageList.push({
                text: `...`, 
                active: false,
                disabled: true,
                page: null
            })
        } 
        if (end != last_page) {
            pageList.push({
                text: `${last_page}`, 
                active: false,
                disabled: false,
                page: last_page
            })
        } 

        setPages(pageList);
    }, [props.currentPage, props.itemCount, props.pageCount])

    if (props.currentPage !== 0 &&
        props.itemCount !== 0 &&
        props.pageCount !== 0) {

        const paginationList = pages.map((item, index: number) => (
            <PaginationItem key={index} 
                            className={item.active ? 'active' : ''}
                            disabled={item.disabled}>
                <PaginationLink
                    href={item.page !== null ? (props.url + "?" + setSearchQuery(props.location.search, item.page)) : ""}
                >
                    {item.text}
                    
                    {(
                        item.active ? <span className="sr-only">(current)</span> : ''
                    )}
                </PaginationLink>
            </PaginationItem>
        ));

        return (
            <nav aria-label="...">
                <PaginationContainer
                    className="pagination justify-content-center mb-0"
                    listClassName="justify-content-center mb-0"
                >
                    {paginationList}
                </PaginationContainer>
            </nav>
        );
    }
    
    return (null);
}

export default withRouter(Pagination);