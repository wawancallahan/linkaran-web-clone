import * as React from 'react'
import { NavLink, Collapse } from 'reactstrap';
import SingleLink from './SingleLink';
import { SidebarRoute } from './Sidebar';
import { withRouter, RouteComponentProps } from 'react-router-dom'

type OwnProps = RouteComponentProps & {
    key: string,
    index: number,
    item: SidebarRoute,
    closeCollapse: () => void,
}

type Props = OwnProps

const DropdownLink: React.FC<Props> = (props) => {

    const activeRoute = (): boolean => {
        if (props.item.activeRouteName) {
            return props.location.pathname.indexOf(props.item.activeRouteName) > -1;
        }
        
        return false;
    }

    const [collapseVisible, setCollapseVisible] = React.useState(activeRoute())

    const toggleCollapseSidebar = () => {
        setCollapseVisible( ! collapseVisible)
    }

    return (
        <>
            <NavLink
                onClick={() => toggleCollapseSidebar()}
                id={`nav_dropdown_${props.index}`}
                className={`SidebarDropdown ${collapseVisible ? 'ActiveDropdown' : ''}`}
            >
                <i className={props.item.icon} />
                {props.item.name}
                <span className="dropdown-icon">
                    <i className="fa fa-angle-right"></i>
                </span>
            </NavLink>
            <Collapse isOpen={collapseVisible}>
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

export default withRouter(DropdownLink)