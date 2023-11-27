import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
} from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData();

  const authMode = searchParams.get("mode") || "login";

  const submitBtnCaption = authMode === "login" ? "Login" : "Create User";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Log in with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="auth-container">
      <Form method="post" className="form" id="auth-form">
        <div className="icon-img">
          {/* {authMode === "login" ? <FaLock /> : <FaUserPlus />} */}
        </div>
        <p>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </p>
        <p>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength={7}
          />
        </p>
        {validationErrors && (
          <ul>
            {Object.values(validationErrors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div className="form-actions">
          <button disabled={isSubmitting} className="login-btn">
            {isSubmitting ? "Authenticating..." : submitBtnCaption}
          </button>
          <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
            {toggleBtnCaption}
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;
