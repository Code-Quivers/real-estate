import { Notification } from "rsuite";

export const SendMessageErrorMessage = ({ error }) => {
  return (
    <Notification type="error" header="error" closable>
      <div>
        <p className="text-lg font-semibold mb-2">{error?.message || "Failed to Sent"}</p>
      </div>
    </Notification>
  );
};
export const SuccessUpdate = ({ message }) => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold mb-2">{message || "Updated Successfully"}</p>
      </div>
    </Notification>
  );
};
export const FailedUpdate = ({ message }) => {
  return (
    <Notification type="error" header="error" closable>
      <div>
        <p className="text-lg font-semibold mb-2">{message || "Failed to Update"}</p>
      </div>
    </Notification>
  );
};
