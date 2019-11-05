import Cookies from 'universal-cookie'

const authCookieName = 'auth-token';
const emailCookieName = 'email-address';
const userTypeIdCookieName = 'user-type-id';
const userIdCookieName = 'user-id';
const domainCookieName = 'domain-name';
const displayCookieName = 'display-name';
const firstCookieName = 'first-name';
const regionIdCookieName = 'region-id';
const isAdminCookieName = 'is-admin';

export const getAuthToken = () => {
    return getCookieValue(authCookieName);
}

export const setAuthToken = (val) =>  {
    setCookieValue(authCookieName, val);
}

export const isAuthenticated = () =>  {
    return getAuthToken() !== undefined;
}

export const signout = () => {
    var c = new Cookies();
    c.remove(authCookieName);
    c.remove(emailCookieName);
}

export const setUserTypeId = (val) =>  {
    setCookieValue(userTypeIdCookieName, val)
}

export const getUserTypeId = () => {
    return getCookieValue(userTypeIdCookieName);
}

export const setUserId = (val) =>  {
    setCookieValue(userIdCookieName, val)
}

export const getUserId = () => {
    return getCookieValue(userIdCookieName);
}

export const setEmail = (val) =>  {
    setCookieValue(emailCookieName, val);
}

export const getEmail = () => {
    return getCookieValue(emailCookieName);
}

export const setDomainName = (val) =>  {
    setCookieValue(domainCookieName, val)
}

export const getDomainName = () => {
    return getCookieValue(domainCookieName);
}

export const setDisplayName = (val) => {
    setCookieValue(displayCookieName, val)
}

export const getDisplayName = () => {
    return getCookieValue(displayCookieName);
}

export const setFirstName = (val) => {
    setCookieValue(firstCookieName, val)
}

export const getFirstName = () => {
    return getCookieValue(firstCookieName);
}

export const setRegionId = (val) => {
    setCookieValue(regionIdCookieName, val)
}

export const getRegionId = () => {
    return getCookieValue(regionIdCookieName);
}

export const setIsAdministrator = (val) => {
    setCookieValue(isAdminCookieName, val)
}

export const getIsAdministrator = () => {
    return getCookieValue(isAdminCookieName);
}

const setCookieValue = (name, val) => {
    var c = new Cookies();
    c.set(name, val, {path: '/'})
}

const getCookieValue = (name) => {
    var c = new Cookies();
    return c.get(name);
}
