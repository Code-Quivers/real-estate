import { Notification } from "rsuite";

export const SignUpSuccessMessage = () => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          Congratulations! You have successfully signed up as a tenant user.
        </p>
        <hr className="border-t border-gray-300 my-4" />
        <p>Your account is now ready to use.</p>
      </div>
    </Notification>
  );
};

export const LoginSuccessMessage = (message) => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          {message ?? "Congratulations! You have Successfully logged in"}
        </p>
      </div>
    </Notification>
  );
};
export const LoginErrorMessage = (message) => {
  return (
    <Notification type="error" header="Error" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          {message ?? "Error! Something went wrong !"}
        </p>
      </div>
    </Notification>
  );
};

export const savedItemTenant = () => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          {"Tenant Saved Successfully"}
        </p>
      </div>
    </Notification>
  );
};
export const savedItemServiceProvider = ({ type, header, message }) => {
  return (
    <Notification type={type} header={header} closable>
      <div>
        <p className="text-lg font-semibold mb-2">{message}</p>
      </div>
    </Notification>
  );
};
