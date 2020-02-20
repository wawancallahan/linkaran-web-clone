import CountryRoutes from './country/Index';
import ProvinceRoutes from './province/Index';
import DistrictRoutes from './district/Index';
import SubDistrictRoutes from './subDistrict/Index';
import VillageRoutes from './village/Index';

export default [
    ...CountryRoutes,
    ...DistrictRoutes,
    ...ProvinceRoutes,
    ...SubDistrictRoutes,
    ...VillageRoutes
]