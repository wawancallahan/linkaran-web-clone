import { Paginator } from '../paginator';
import { ServiceCount } from './service';
import { Vehicle } from './vehicle';
import { VehicleType } from './vehicleType';
import { Country } from './region/country';
import { Province } from './region/province';
import { District } from './region/district';
import { Village } from './region/village';
import { SubDistrict } from './region/subDistrict';
import { User, EMoneyUser } from './user';
import { SubBrandVehicle } from './subBrandVehicle';
import { BrandVehicle } from './brandVehicle';

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
    negara: {
        label: string,
        value: number
    },
    provinsi: {
        label: string,
        value: number
    },
    kabupaten_kota: {
        label: string,
        value: number
    },
    kecamatan: {
        label: string,
        value: number
    },
    kelurahan: {
        label: string,
        value: number
    },
    foto_profil: File | null,
    foto_profil_preview: string,
    rating: number | null,
    tipe_kendaraan: {
        label: string,
        value: number
    },
    merek: {
        label: string,
        value: number
    },
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
    isMeried: boolean
}

export type FormFieldFromCustomer = Omit<FormField, 'nama' | 'no_telepon' | 'email'> & {
    user: {
        label: string,
        value: number
    }
}

export type FormFieldFromCustomerWithId = Omit<FormField, 'nama' | 'no_telepon' | 'email'> & {
    user: {
        id: number
    }
}

interface DriverField {
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
    isMeried: boolean
}

interface DriverList {
    dateOfBirth: string,
    placeOfBirth: string,
    residenceAddress: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    rating: number,
    country: {
        id: number,
        name: string
    },
    province: {
        id: number,
        name: string
    },
    district: {
        id: number,
        name: string
    },
    subDistrict: {
        id: number,
        name: string
    },
    village: {
        id: number,
        name: string
    },
    user: Partial<User & {
        vehicle: Partial<Vehicle & {
            subBrandVehicle: Partial<SubBrandVehicle & {
                brandVehicle: Partial<BrandVehicle>
            }>,
            vehicleType: VehicleType
        }>,
        eMoneyUser: EMoneyUser[]
    }>,
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
    isMeried: boolean
}

interface DriverList2 {
    dateOfBirth: string,
    gender: string,
    identityNumber: string,
    ktpPhoto: string,
    photo: string,
    address: string,
    rating: number,
    country: {
        id: string
    },
    province: {
        id: string
    },
    district: {
        id: string
    },
    subDistrict: {
        id: string
    },
    village: {
        id: string
    },
    user: {
        id: number
    },
    isMeried: boolean,
    deletedAt: string,
    id: number,
    createdAt: string,
    updatedAt: string
}

export type DriverDetail = {
    id: number,
    dateOfBirth: string,
    placeOfBirth: string,
    residenceAddress: string,
    gender: string,
    identityNumber:string,
    ktpPhoto: string | null,
    photo: string | null,
    address: string,
    rating: number,
    wasOnceAnOnlineDriver: boolean,
    isActivelyBecomingAnotherOnlineDriver: boolean,
    isJoiningTheDriverCommunity: boolean,
    isJoiningLinkaranAsmainJob: boolean,
    choiceOfActiveWorkHours: string,
    name: string,
    phoneNumber: string,
    email: string,
    gUserId: string | null,
    gUserPhoneVerified: string | null,
    vehicle: Vehicle & {
        vehicleType: VehicleType,        
        subBrandVehicle: {
            id: number,
            name: string,
            brandVehicle: {
                id: number,
                name: string
            }
        }
    },
    serviceCount: ServiceCount[],
    isMeried: boolean,
    country: Country | null,
    province: Province | null,
    district: District | null,
    subDistrict: SubDistrict | null,
    village: Village | null
}

interface DriverResult {
    id: number,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
}

export type Driver = DriverResult & DriverList & {
    country?: Partial<Country>,
    province?: Partial<Province>,
    district?: Partial<District>,
    subDistrict?: Partial<SubDistrict>,
    village?: Partial<Village>
};

export type DriverCreate = DriverField;

export type DriverCreateFromCustomer = Omit<DriverField, 'nama' | 'no_telepon' | 'email'> & {
    user: {
        id: number
    }
}

export type DriverEdit = DriverField;

export type DriverCreateResult = DriverResult & DriverList2;

export type DriverEditResult = DriverResult &  DriverList2;

export type DriverCreateFromCustomerResult = DriverResult &  DriverList2;

export interface FetchDriverActionType {
    type: typeof FETCH_DRIVER,
    list: Driver[]
}

export interface FetchDriverSuccessActionType {
    type: typeof FETCH_DRIVER_SUCCESS,
    list: Driver[]
}

export interface FetchDriverErrorActionType {
    type: typeof FETCH_DRIVER_ERROR
}


export interface SetPaginatorDriverActionType {
    type: typeof SET_PAGINATOR_DRIVER,
    paginate: Paginator
}

export interface AlertDriverHideActionType {
    type: typeof ALERT_DRIVER_HIDE
}

export interface AlertDriverShowActionType {
    type: typeof ALERT_DRIVER_SHOW,
    message: string,
    color: string
}

export interface Filter {
    name: string,
    phoneNumber: string,
    email: string,
    address: string
}

export type FilterKeys = keyof Filter;

export interface SetFilterDriverActionType {
    type: typeof SET_FILTER_DRIVER,
    filter: Filter
}

export interface ClearFilterDriverActionType {
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