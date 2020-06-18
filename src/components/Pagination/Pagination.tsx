import * as React from 'react';
import {
    Pagination as PaginationContainer,
    PaginationLink,
    PaginationItem
} from 'reactstrap';

type Props = {
    pageCount: number,
    currentPage: number,
    itemCount: number,
    itemClicked: (page: number) => void 
}

export type Page = {
    text: string,
    active: boolean,
    disabled: boolean,
    page: number | null
}

const Pagination: React.FC<Props> = (props) => {
    const [sidePageLimit, setSidePageLimit] = React.useState(2)
    const pages: Page[] = []

    const paginationItemClicked = (page: number) => {
        props.itemClicked(page)
    }

    let paginationRender = null;

    if (props.currentPage !== 0 &&
        props.itemCount !== 0 &&
        props.pageCount !== 0) {
        
            const current_page = props.currentPage;
            const last_page = props.pageCount;
            const side_page_limit = sidePageLimit;

            const start = (current_page - side_page_limit) < 1 ? 1 : current_page - side_page_limit;
            const end = (current_page + side_page_limit) > last_page ? last_page : current_page + side_page_limit;
            
            if (start != 1) {
                pages.push({
                    text: '1', 
                    active: false, 
                    disabled: false,
                    page: 1
                })
            }

            if (start > 2) {
                pages.push({
                    text: `...`, 
                    active: false, 
                    disabled: true,
                    page: null
                })
            } 

            for (let page = start; page <= end; page++) {
                pages.push({
                    text: `${page}`, 
                    active: page == current_page, 
                    disabled: page == current_page,
                    page: page
                })
            }

            if (end < last_page - 1) {
                pages.push({
                    text: `...`, 
                    active: false,
                    disabled: true,
                    page: null
                })
            } 
            if (end != last_page) {
                pages.push({
                    text: `${last_page}`, 
                    active: false,
                    disabled: false,
                    page: last_page
                })
            } 

            const paginationList = pages.map((item, index: number) => (
                <PaginationItem key={index} 
                                className={item.active ? 'active' : ''}
                                disabled={item.disabled}>
                    <PaginationLink
                        href=""
                        onClick={(e) => item.page ? paginationItemClicked(item.page) : e.preventDefault()}
                    >
                        {item.text}
                        
                        {(
                            item.active ? <span className="sr-only">(current)</span> : ''
                        )}
                    </PaginationLink>
                </PaginationItem>
            ));

            paginationRender = (
                <PaginationContainer
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                >
                    {paginationList}
                </PaginationContainer>
            );
    }

    return (
        <nav aria-label="...">
           {paginationRender}
        </nav>
    );
}

export default Pagination;