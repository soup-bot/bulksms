import AuthForm from "../components/AuthForm";
import authStyles from "../components/Auth.css";

function Auth() {
  return (
    <>
      <AuthForm />
    </>
  );
}

export default Auth;
export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
