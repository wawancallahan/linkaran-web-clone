declare module 'react-lazyload' {
    import { Component, ReactNode  } from 'react'

    export interface LazyLoadProps {
        once?: boolean;
        height?: number | string;
        offset?: number | number[];
        overflow?: boolean;
        resize?: boolean;
        scroll?: boolean;
        children?: ReactNode;
        throttle?: number | boolean;
        debounce?: number | boolean;
        placeholder?: ReactNode;
        scrollContainer?: string | Element;
        unmountIfInvisible?: boolean;
        preventLoading?: boolean;
    }

    export default class LazyLoad extends Component<LazyLoadProps> {
        constructor(props: LazyLoad);
    }

    export function lazyload(option: {}): LazyLoad;

    export function forceCheck(): void;
    export function forceVisible(): void;
}