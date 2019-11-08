import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { FoodCategoryActionTypes as AdminFoodCategoryActionTypes } from './admin/foodCategory';
import { RestaurantActionTypes as AdminRestaurantActionTypes } from './admin/restaurant';
import { DriverActionTypes } from './admin/driver'; 

export type AppActions = 
    | AdminUserActionTypes
    | AdminFoodCategoryActionTypes
    | AdminRestaurantActionTypes
    | DriverActionTypes