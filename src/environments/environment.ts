import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
// let keycloakConfig: KeycloakConfig = {
//   url: 'http://localhost:8080/auth',
//   realm: 'FleetDefence',
//   clientId: 'nodejs'
// };
let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'nodejs'
};

export const environment = {
    production: false,
    envName: 'default',
    url_admin_be: 'http://localhost:3001',
    // url_assets: 'https://assets.int.fleetdefense.com',
    url_assets: 'http://factorymedia.local',
    url_lesson: 'http://localhost:4202',
    keycloak: keycloakConfig
    // url_admin_be: 'https://be-admin.fleetdefense.com',
    // url_assets: 'https://assets.fleetdefense.com',
    // url_lesson: 'https://lesson.fleetdefense.com'
};
