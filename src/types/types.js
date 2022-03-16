//Todos los tipos de las acciones

export const types = {

    uiOpenModal: '[ui] Open Modal',
    uiCloseModal: '[ui] Close Modal',
    
    eventSetActive: '[event] Set Active',

    eventLogout: '[event] Logout event',
    eventStartAddNew: '[event] Start add new',
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Events loaded',
    authChecking: '[auth] Checking login state',
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout'
}