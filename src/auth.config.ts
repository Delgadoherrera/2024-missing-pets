import { isPlatform } from "@ionic/react";

export const domain = "dev-282tdo26yvhz288g.us.auth0.com";
export const clientId = "cJOBYqppCvfXGU4ugKJjZ6bIAYvRJ1az";
const appId = "io.ionic.starter";

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('hybrid');

export const callbackUri = iosOrAndroid
  ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : 'http://localhost:8100';