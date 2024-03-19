import Link from "next/link";
import { Button } from "rsuite";

const ServiceProviderDashboardButton = ({ firstTitle, secondTitle, btnLoading, btnType, href }) => {
  return (
    <Button
      as={Link}
      href={href}
      loading={btnLoading}
      type={btnType ?? "button"}
      className={`!px-10 whitespace-pre-wrap  !py-2 !bg-[#29429f] !text-white !rounded-full `}
      size="lg"
      appearance="default"
    >
      {firstTitle} <br /> {secondTitle}
    </Button>
  );
};

export default ServiceProviderDashboardButton;
