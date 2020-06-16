import * as React from 'react'
import { NavLink, Collapse } from 'reactstrap';
import SingleLink from './SingleLink';
import { SidebarRoute, SidebarDropdown } from './Sidebar';

type OwnProps = {
    key: string,
    index: number,
    item: SidebarRoute,
    SidebarDropdown: SidebarDropdown[],
    closeCollapse: () => void,
    toggleCollapseSidebar: (index: number, key: string) => void,
}

type Props = OwnProps

const DropdownLink: React.FC<Props> = (props) => {
    const collapseSidebarDropdown: SidebarDropdown[] = {
        ...props.SidebarDropdown
    };

    let isOpen = false;

    if (collapseSidebarDropdown[props.index]) {
        isOpen = collapseSidebarDropdown[props.index].collapseOpen;
    }

    return (
        <>
            <NavLink
                onClick={() => props.toggleCollapseSidebar(props.index, `nav_dropdown_${props.index}`)}
                id={`nav_dropdown_${props.index}`}
                className={`SidebarDropdown ${isOpen ? 'ActiveDropdown' : ''}`}
            >
                <i className={props.item.icon} />
                {props.item.name}
                <span className="dropdown-icon">
                    <i className="fa fa-angle-right"></i>
                </span>
            </NavLink>
            <Collapse isOpen={isOpen}>
                {props.item.child ? props.item.child.map((item: any, index: number) => {
                    return <SingleLink key={`nav_dropdown_${props.index}_${index}`}
                                    index={index}
                                    path={item.path}
                                    closeCollapse={props.closeCollapse}
                                    icon={item.icon}
                                    name={item.name}
                                    isChild={true} />
                }) : null}
            </Collapse>
        </>
    );
}

export default DropdownLink