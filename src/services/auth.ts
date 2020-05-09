export const name = () => localStorage.getItem('name');
export const phoneNumber = () => localStorage.getItem('phoneNumber');
export const email = () => localStorage.getItem('email');
export const accessToken = () => localStorage.getItem('accessToken');
export const roles = () => localStorage.getItem('roles');

export const rolesToObject = () => {
    if (roles() !== null) {
        return JSON.parse(roles() as string)
    }

    return {};
}

export const rolesToArray = (): string[] => {
    if (roles() !== null) {
        return Object.values(JSON.parse(roles() as string))
    }

    return [];
}
