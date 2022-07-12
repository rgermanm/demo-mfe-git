
export const authConfig = {
    clientId: null,
    oauth2BaseUrl: null,
    azHomeUrl: null,
    azWindowUrl: null,
    baseUrl: null,
    replaceUrl: null,
    production: false,
    hasSession: false,
    goplvl: null,
    codGop : null,
    permissions: null,
    userName:null,
    loadedFrame:false
}

export function isInterno(){
     return authConfig.codGop == null && authConfig.goplvl == null ;
}