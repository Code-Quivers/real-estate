import { Notification } from "rsuite";

export const SaveUnitNotificationSuccess = (message) => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="lg:text-lg font-semibold lg:mb-2">{message || "Unit Saved"}</p>
      </div>
    </Notification>
  );
};
export const SaveUnitNotificationError = (message) => {
  return (
    <Notification type="error" header="error" closable>
      <div>
        <p className="lg:text-lg font-semibold lg:mb-2">{message || "Failed to Save"}</p>
      </div>
    </Notification>
  );
};
