import profileLogo from "@/assets/propertyOwner/profilePic.png";
import { fileUrlKey } from "@/configs/envConfig";

export const getParticipantName = (participant) => {
  switch (participant?.role) {
    case "TENANT":
      return `${participant?.tenant?.firstName} ${participant?.tenant?.lastName}`;
    case "PROPERTY_OWNER":
      return `${participant?.propertyOwner?.firstName} ${participant?.propertyOwner?.lastName}`;
    case "SERVICE_PROVIDER":
      return `${participant?.serviceProvider?.firstName} ${participant?.serviceProvider?.lastName}`;
    default:
      return "";
  }
};

// ! get profile image of chat

export const getProfileImageUrl = (userData) => {
  const role = userData?.role;
  const defaultImageUrl = profileLogo;

  switch (role) {
    case "PROPERTY_OWNER":
      return `${fileUrlKey()}/${userData?.propertyOwner?.profileImage}`;
    case "TENANT":
      return `${fileUrlKey()}/${userData?.tenant?.profileImage}`;
    case "SERVICE_PROVIDER":
      return `${fileUrlKey()}/${userData?.serviceProvider?.profileImage}`;
    default:
      return defaultImageUrl;
  }
};
