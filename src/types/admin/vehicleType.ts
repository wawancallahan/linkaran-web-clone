export type VehicleType = {
    id: number,
    name: string,
    code: string,
    seat: string
}

export type VehicleTypeList = Omit<VehicleType, 'code' | 'seat'>

export type VehicleTypeShow = VehicleType