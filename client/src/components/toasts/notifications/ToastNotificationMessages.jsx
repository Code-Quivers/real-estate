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
