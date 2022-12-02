import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'https://login.fleetdefense.com/auth',
  realm: 'fleetdefense',
  clientId: 'AD-dams'
};

export const environment = {
    production: true,
    envName: 'brampton',
    url_admin_be: 'https://be-dams.fleetdefense.com',
    url_assets: 'https://assets.fleetdefense.com',
    url_lesson: 'https://lesson.fleetdefense.com',
    keycloak: keycloakConfig
};