export const name = localStorage.getItem('name')
export const phoneNumber = localStorage.getItem('phoneNumber')
export const email = localStorage.getItem('email')
export const accessToken = localStorage.getItem('accessToken')
export const roles = localStorage.getItem('roles')

export const rolesToObject = () => {
    if (roles) {
        return JSON.parse(roles);
    }

    return {};
}

export const rolesToArray = () => {
    if (roles) {
        return Object.values(JSON.parse(roles));
    }

    return [];
}
