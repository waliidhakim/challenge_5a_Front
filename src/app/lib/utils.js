export const extractId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
};


export const extractRole = (extandedRole) => {
    const parts = extandedRole.split('_');
    return parts[parts.length - 1];
}