export const name = () => localStorage.getItem('name');
export const phoneNumber = () => localStorage.getItem('phoneNumber');
export const email = () => localStorage.getItem('email');
export const accessToken = () => localStorage.getItem('accessToken');

export const rolesToObject = () => {
    const roles = localStorage.getItem('roles')

    if (roles) {
        return JSON.parse(roles);
    }

    return {};
}

export const rolesToArray = () => {
    const roles = localStorage.getItem('roles')

    if (roles) {
        return Object.values(JSON.parse(roles));
    }

    return [];
}
