import React, { Component } from 'react'
import { NavLink as NavLinkRRD } from "react-router-dom";
import { NavLink } from 'reactstrap';

type SingleLinkProps = {
    key: string,
    index: number,
    path: string,
    closeCollapse: () => void,
    icon: string,
    name: string,
    isChild: boolean
}

type Props = SingleLinkProps

class SingleLink extends Component<Props> {
    render() {
        return (
            <NavLink
                to={this.props.path}
                tag={NavLinkRRD}
                onClick={this.props.closeCollapse}
                activeClassName="active"
                className={`${this.props.isChild ? 'nav-link-child' : ''}`}
                >
                <i className={this.props.icon} />
                {this.props.name}
            </NavLink>
        )
    }
}

export default SingleLink