import * as React from 'react'
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from 'reactstrap';

type OwnProps = {
    key: string,
    index: number,
    path: string,
    closeCollapse: () => void,
    icon: string,
    name: string,
    isChild: boolean
}

type Props = OwnProps

const SingleLink: React.FC<Props> = (props) => {
    return (
        <NavLink
            to={props.path}
            tag={NavLinkRRD}
            onClick={props.closeCollapse}
            activeClassName="active"
            className={`${props.isChild ? 'nav-link-child' : ''}`}
            >
            <i className={props.icon} />
            {props.name}
        </NavLink>
    )
}

export default SingleLink