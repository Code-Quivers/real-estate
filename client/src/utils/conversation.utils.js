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

  switch (role) {
    case "PROPERTY_OWNER":
      return userData?.propertyOwner?.profileImage ? `${fileUrlKey()}/${userData.propertyOwner.profileImage}` : profileLogo;
    case "TENANT":
      return userData?.tenant?.profileImage ? `${fileUrlKey()}/${userData.tenant.profileImage}` : profileLogo;
    case "SERVICE_PROVIDER":
      return userData?.serviceProvider?.profileImage ? `${fileUrlKey()}/${userData.serviceProvider.profileImage}` : profileLogo;
    default:
      return profileLogo;
  }
};
