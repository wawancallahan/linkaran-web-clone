import React, { Component } from 'react'
import { NavLink, Collapse } from 'reactstrap';
import SingleLink from './SingleLink';
import { SidebarRoute, SidebarDropdown } from './Sidebar';

type DropdownLinkProps = {
    key: string,
    index: number,
    item: SidebarRoute,
    SidebarDropdown: SidebarDropdown[],
    closeCollapse: () => void,
    toggleCollapseSidebar: (index: number, key: string) => void,
}

type Props = DropdownLinkProps

class DropdownLink extends Component<Props> {
    render() {
        const collapseSidebarDropdown: SidebarDropdown[] = {
            ...this.props.SidebarDropdown
        };
    
        let isOpen = false;
    
        if (collapseSidebarDropdown[this.props.index]) {
            isOpen = collapseSidebarDropdown[this.props.index].collapseOpen;
        }

        return (
            <>
              <NavLink
                    onClick={() => this.props.toggleCollapseSidebar(this.props.index, `nav_dropdown_${this.props.index}`)}
                    id={`nav_dropdown_${this.props.index}`}
                    className={`SidebarDropdown ${isOpen ? 'ActiveDropdown' : ''}`}
                >
                    <i className={this.props.item.icon} />
                    {this.props.item.name}
                    <span className="dropdown-icon">
                        <i className="fa fa-angle-right"></i>
                    </span>
              </NavLink>
              <Collapse isOpen={isOpen}>
                  {this.props.item.child ? this.props.item.child.map((item: any, index: number) => {
                      return <SingleLink key={`nav_dropdown_${this.props.index}_${index}`}
                                        index={index}
                                        path={item.path}
                                        closeCollapse={this.props.closeCollapse}
                                        icon={item.icon}
                                        name={item.name}
                                        isChild={true} />
                    }) : null}
              </Collapse>
            </>
          );
    }
}

export default DropdownLink