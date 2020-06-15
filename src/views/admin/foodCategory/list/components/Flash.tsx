import * as React from 'react'
import { Alert as IAlert } from '../../../../../types/alert';
import { Alert } from 'reactstrap';
import { setAlertFoodCategoryHideAction } from '../../../../../actions/admin/foodCategory';
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../../../../../types';
import { connect } from 'react-redux';
import { AppState } from '../../../../../store/configureStore';

type OwnProps = {}

type Props = OwnProps & LinkStateToProps & LinkDispatchToProps

const Flash: React.FC<Props> = (props) => {
    return (
        <Alert color={props.alert.color} isOpen={props.alert.visible} toggle={() => props.setAlertFoodCategoryHideAction()} fade={false}>
            <div>{props.alert.message}</div>
        </Alert>
    )
}

type LinkStateToProps = {
    alert: IAlert
}

const mapStateToProps = (state: AppState): LinkStateToProps => {
    return {
        alert: state.foodCategory.alert
    }
}

type LinkDispatchToProps = {
    setAlertFoodCategoryHideAction: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, OwnProps: OwnProps): LinkDispatchToProps => {
    return {
        setAlertFoodCategoryHideAction: () => dispatch(setAlertFoodCategoryHideAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash);

