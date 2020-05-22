import { Paginator } from '../paginator';
import { ServiceCount } from './service';
import { Vehicle } from './vehicle';
import { VehicleType } from './vehicleType';
import { Country } from './region/country';
import { Province } from './region/province';
import { District } from './region/district';
import { Village } from './region/village';
import { SubDistrict } from './region/subDistrict';
import { User } from './user';
import { SubBrandVehicle } from './subBrandVehicle';
import { BrandVehicle } from './brandVehicle';
import { SelectType } from '../select';
import { Timestamps } from '../timestamps';
import { EMoneyUser } from './eMoneyUser';

export const FETCH_DRIVER = "FETCH_DRIVER";
export const FETCH_DRIVER_SUCCESS = "FETCH_DRIVER_SUCCESS";
export const FETCH_DRIVER_ERROR = "FETCH_DRIVER_ERROR";
export const SET_PAGINATOR_DRIVER = "SET_PAGINATOR_DRIVER";
export const SET_FILTER_DRIVER = "SET_FILTER_DRIVER";
export const CLEAR_FILTER_DRIVER = "CLEAR_FILTER_DRIVER";

export const ALERT_DRIVER_SHOW = "ALERT_DRIVER_SHOW";
export const ALERT_DRIVER_HIDE = "ALERT_DRIVER_HIDE";

export type FormField = {
    nama: string,
    no_telepon: string,
    email: string,
    tanggal_lahir: Date | null,
    tempat_lahir: string,
    jenis_kelamin: number | null,
    no_ktp: string,
    ktp_file: File | null,
    ktp_file_preview: string,
    no_sim: string,
    sim_file: File | null,
    sim_file_preview: string,
    alamat: string,
    alamat_domisili: string,
    negara: SelectType,
    provinsi: SelectType,
    kabupaten_kota: SelectType,
    kecamatan: SelectType,
    kelurahan: SelectType,
    foto_profil: File | null,
    foto_profil_preview: string,
    rating: number | null,
    tipe_kendaraan: SelectType,
    merek: SelectType,
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    jumlah_seat: number | null,
    warna: string,
    keterangan: string,
    wasOnceAnOnlineDriver: string,
    isActivelyBecomingAnotherOnlineDriver: string,
    isJoiningTheDriverCommunity: string,
    isJoiningLinkaranAsmainJob: string,
    choiceOfActiveWorkHours: string,
    choiceOfActiveWorkHoursOther: boolean,
    custom_interval_jam_kerja_start: Date | null,
    custom_interval_jam_kerja_end: Date | null,
    isMeried: boolean,
    driverHelpCenter: boolean,
}

export type FormFieldFromCustomer = Omit<FormField, 'nama' | 'no_telepon' | 'email'> & {
    user: SelectType
}

export type FormFieldFromCustomerWithId = Omit<FormField, 'nama' | 'no_telepon' | 'email'> & {
    user: {
        id: number
    }
}

export type DriverField = {
    nama: string,
    no_telepon: string,
    email: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    jenis_kelamin: number,
    no_ktp: string,
    ktp_file: File | null,
    no_sim: string,
    sim_file: File | null,
    alamat: string,
    alamat_domisili: string,
    negara: {
        id: number
    },
    provinsi: {
        id: number
    },
    kabupaten_kota: {
        id: number
    },
    kecamatan: {
        id: number
    },
    kelurahan: {
        id: number
    },
    foto_profil: File | null,
    rating: number,
    tipe_kendaraan: {
        id: number
    },
    merek: {
        id: number
    },
    no_stnk: string,
    no_polisi: string,
    no_rangka: string,
    jumlah_seat: number,
    warna: string,
    keterangan: string,
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
    isMeried: boolean,
    driverHelpCenter: boolean,
}

export type Driver = {
    id: number,
    dateOfBirth: string,
    placeOfBirth: string,
    residenceAddress: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string | null,
    photo: string | null,
    address: string,
    driverHelpCenter: boolean,
    rating: number,
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
    isMeried: boolean
}

export type DriverList = Driver & Partial<Timestamps> & {
    user?: Partial<User> & {
        eMoneyUser?: Partial<EMoneyUser>[],
        vehicle?: Partial<Vehicle> & {
            subBrandVehicle?: Partial<SubBrandVehicle> & {
                brandVehicle: Partial<BrandVehicle>
            },
            vehicleType?: Partial<VehicleType>
        }
    },
    country?: Partial<Country> | null,
    province?: Partial<Province> | null,
    district?: Partial<District> | null,
    subDistrict?: Partial<SubDistrict> | null,
    village?: Partial<Village> | null,
}

export type DriverShow = Driver & Partial<Timestamps> & Partial<Omit<User, "id">> & {
    eMoneyUser?: Partial<EMoneyUser>[],
    vehicle?: Partial<Vehicle> & {
        subBrandVehicle?: Partial<SubBrandVehicle> & {
            brandVehicle: Partial<BrandVehicle>
        },
        vehicleType?: Partial<VehicleType>
    },
    serviceCount?: Partial<ServiceCount>[],
    country?: Partial<Country> | null,
    province?: Partial<Province> | null,
    district?: Partial<District> | null,
    subDistrict?: Partial<SubDistrict> | null,
    village?: Partial<Village> | null,
}

export type DriverCreateField = DriverField;

export type DriverCreateFromCustomer = Omit<DriverField, 'nama' | 'no_telepon' | 'email'> & {
    user: {
        id: number
    }
}

export type DriverEditField = DriverField;

export type DriverCreateResult = Driver & Partial<Timestamps> & {
    user?: Partial<User> & {
        eMoneyUser?: Partial<EMoneyUser> & Partial<Timestamps>,
        vehicle?: Partial<Vehicle> & Partial<Timestamps> & {
            subBrandVehicle?: Partial<SubBrandVehicle>,
            vehicleType?: Partial<VehicleType>
        }
    },
    country?: Partial<Country> | null,
    province?: Partial<Province> | null,
    district?: Partial<District> | null,
    subDistrict?: Partial<SubDistrict> | null,
    village?: Partial<Village> | null
}

export type DriverEditResult = Driver & Partial<Timestamps> & {
    user?: Partial<User> & {
        eMoneyUser?: Partial<EMoneyUser> & Partial<Timestamps>,
        vehicle?: Partial<Vehicle> & Partial<Timestamps> & {
            subBrandVehicle?: Partial<SubBrandVehicle>,
            vehicleType?: Partial<VehicleType>
        }
    },
    country?: Partial<Country> | null,
    province?: Partial<Province> | null,
    district?: Partial<District> | null,
    subDistrict?: Partial<SubDistrict> | null,
    village?: Partial<Village> | null
}

export type DriverCreateFromCustomerResult = Driver & Partial<Timestamps> & {
    user?: Partial<User> & {
        eMoneyUser?: Partial<EMoneyUser> & Partial<Timestamps>,
        vehicle?: Partial<Vehicle> & Partial<Timestamps> & {
            subBrandVehicle?: Partial<SubBrandVehicle>,
            vehicleType?: Partial<VehicleType>
        }
    },
    country?: Partial<Country> | null,
    province?: Partial<Province> | null,
    district?: Partial<District> | null,
    subDistrict?: Partial<SubDistrict> | null,
    village?: Partial<Village> | null
}

export type FetchDriverActionType = {
    type: typeof FETCH_DRIVER,
    list: Driver[]
}

export type FetchDriverSuccessActionType = {
    type: typeof FETCH_DRIVER_SUCCESS,
    list: Driver[]
}

export type FetchDriverErrorActionType = {
    type: typeof FETCH_DRIVER_ERROR
}


export type SetPaginatorDriverActionType = {
    type: typeof SET_PAGINATOR_DRIVER,
    paginate: Paginator
}

export type AlertDriverHideActionType = {
    type: typeof ALERT_DRIVER_HIDE
}

export type AlertDriverShowActionType = {
    type: typeof ALERT_DRIVER_SHOW,
    message: string,
    color: string
}

export type Filter = {
    name: string,
    phoneNumber: string,
    email: string,
    address: string
}

export type FilterKeys = keyof Filter;

export type SetFilterDriverActionType = {
    type: typeof SET_FILTER_DRIVER,
    filter: Filter
}

export type ClearFilterDriverActionType = {
    type: typeof CLEAR_FILTER_DRIVER
}


export type DriverActionTypes =
    | FetchDriverActionType
    | FetchDriverSuccessActionType
    | FetchDriverErrorActionType
    | AlertDriverHideActionType
    | AlertDriverShowActionType
    | SetPaginatorDriverActionType
    | SetFilterDriverActionType
    | ClearFilterDriverActionType