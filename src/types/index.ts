import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { FoodCategoryActionTypes as AdminFoodCategoryActionTypes } from './admin/foodCategory';
import { RestaurantActionTypes as AdminRestaurantActionTypes } from './admin/restaurant';
import { BrandVehicleActionTypes as AdminBrandVehicleActionTypes } from './admin/brandVehicle';
import { SubBrandVehicleActionTypes as AdminSubBrandVehicleActionTypes } from './admin/subBrandVehicle';
import { DriverActionTypes as AdminDriverActionTypes } from './admin/driver'; 

export type AppActions = 
    | AdminUserActionTypes
    | AdminFoodCategoryActionTypes
    | AdminRestaurantActionTypes
    | AdminBrandVehicleActionTypes
    | AdminSubBrandVehicleActionTypes
    | AdminDriverActionTypes