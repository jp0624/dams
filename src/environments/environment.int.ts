import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
let keycloakConfig: KeycloakConfig = {
  url: 'https://login.int.fleetdefense.com/auth',
  realm: 'FleetDefense',
  clientId: 'AD-dams'
};

export const environment = {
    production: true,
    envName: 'int',
    url_admin_be: 'https://be-dams-v2.int.fleetdefense.com',
    url_assets: 'https://assets-v2.int.fleetdefense.com',
    url_lesson: 'https://lesson.int.fleetdefense.com',
    keycloak: keycloakConfig
};

// export const environment = {
//   production: true,
//   envName: 'int',
//   url_admin_be: 'https://be-admin.int.fleetdefense.com',
//   url_assets: 'https://assets.int.fleetdefense.com',
//   url_lesson: 'https://lesson.int.fleetdefense.com',
//   keycloak: keycloakConfig
// };
