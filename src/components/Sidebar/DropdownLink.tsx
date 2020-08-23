import * as React from 'react'
import { NavLink, Collapse } from 'reactstrap';
import SingleLink from './SingleLink';
import { SidebarRoute } from './Sidebar';
import { AppState } from '../../reducers';
import { connect } from 'react-redux';

type OwnProps = {
    key: string,
    index: number,
    item: SidebarRoute,
    closeCollapse: () => void,
}

type Props = OwnProps & ReturnType<typeof mapStateToProps>

const DropdownLink: React.FC<Props> = (props) => {

    const activeRoute = (): boolean => {
        if (props.item.activeRouteName) {
            return props.router.location.pathname.indexOf(props.item.activeRouteName) > -1;
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

const mapStateToProps = (state: AppState) => ({
    router: state.router
});

export default connect(mapStateToProps)(DropdownLink)