import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { DriverActionTypes } from './admin/driver'; 

export type AppActions = 
    | AdminUserActionTypes
    | DriverActionTypes