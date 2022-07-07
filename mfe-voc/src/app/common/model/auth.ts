
import packageJson from '../../../../package.json';

export const auth = {
    hasSession: false,
    user:null,
	versionFE:packageJson.version,
    oauth2:{
		clientId:null,
		baseUrl:null,
		redirectUri:null
	},
    roles:[]
}