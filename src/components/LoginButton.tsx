import { useAuth0 } from "@auth0/auth0-react";
import { Browser } from "@capacitor/browser";


const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
        await Browser.open({
          url,
          windowName: "_self",
        });
      },
    });
  };

  return (
    <>
      <div className="google-btn" onClick={login}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <div className="btn-text">
          <p>Entrar con Google</p>
        </div>
      </div>
    </>
  );
};

export default LoginButton;
