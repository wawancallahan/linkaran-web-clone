export type Paginator = {
    currentPage: number,
    pageCount: number,
    itemCount: number,
    total: number
}

export type PaginatorLinkPay = {
    current_page: number,
    first_page_url: string | null,
    from: number,
    last_page: number,
    last_page_url: string | null,
    next_page_url: null,
    path: string | null,
    per_page: number,
    prev_page_url: string | null,
    to: number,
    total: number
}