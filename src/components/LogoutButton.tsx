import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";
import { IonButton } from "@ionic/react";
import { callbackUri } from "../auth.config";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const doLogout = async () => {
    await logout({
      async openUrl(url) {
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
      logoutParams: {
        returnTo: callbackUri,
      },
    });
  };
  doLogout();
};

export default LogoutButton;
