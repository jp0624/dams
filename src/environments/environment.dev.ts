import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'https://login.int.fleetdefense.com/auth',
  realm: 'FleetDefense',
  clientId: 'AD-dams'
};

export const environment = {
    production: false,
    envName: 'dev',
    url_admin_be: 'http://localhost:3001',
    url_assets: 'http://factorymedia.local',
    url_lesson: 'http://localhost:4202',
	keycloak: keycloakConfig
};
