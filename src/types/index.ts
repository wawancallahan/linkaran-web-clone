import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { FoodCategoryActionTypes as AdminFoodCategoryActionTypes } from './admin/foodCategory';
import { DriverActionTypes } from './admin/driver'; 

export type AppActions = 
    | AdminUserActionTypes
    | AdminFoodCategoryActionTypes
    | DriverActionTypes