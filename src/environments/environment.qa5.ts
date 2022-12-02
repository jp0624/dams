import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'FleetDefence',
  clientId: 'nodejs'
};

export const environment = {
    production: true,
    envName: 'qa5',
    url_admin_be: 'https://be-admin.fleetdefense.com',
    url_assets: 'https://assets.fleetdefense.com',
    url_lesson: 'https://lesson.fleetdefense.com',
    keycloak: keycloakConfig
};