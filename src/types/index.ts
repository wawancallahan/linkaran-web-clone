import { UserActionTypes as AdminUserActionTypes } from './admin/user';
import { FoodActionTypes as AdminFoodActionTypes } from './admin/food';
import { FoodCategoryActionTypes as AdminFoodCategoryActionTypes } from './admin/foodCategory';
import { RestaurantActionTypes as AdminRestaurantActionTypes } from './admin/restaurant';
import { BrandVehicleActionTypes as AdminBrandVehicleActionTypes } from './admin/brandVehicle';
import { SubBrandVehicleActionTypes as AdminSubBrandVehicleActionTypes } from './admin/subBrandVehicle';
import { DriverActionTypes as AdminDriverActionTypes } from './admin/driver'; 
import { InvestorActionTypes as AdminInvestorActionTypes } from './admin/investor'; 

export type AppActions = 
    | AdminUserActionTypes
    | AdminFoodActionTypes
    | AdminFoodCategoryActionTypes
    | AdminRestaurantActionTypes
    | AdminBrandVehicleActionTypes
    | AdminSubBrandVehicleActionTypes
    | AdminDriverActionTypes
    | AdminInvestorActionTypes