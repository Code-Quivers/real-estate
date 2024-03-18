import Link from "next/link";
import { Button } from "rsuite";

const TenantProfileButton = ({ firstTitle, secondTitle, btnLoading, btnType, href }) => {
  return (
    <Button
      as={Link}
      href={href}
      loading={btnLoading}
      type={btnType ?? "button"}
      className={`  whitespace-pre-wrap h-full !w-full !py-2 !bg-[#29429f] !text-white !rounded-full `}
      size="md"
      appearance="default"
    >
      {firstTitle} <br /> {secondTitle}
    </Button>
  );
};

export default TenantProfileButton;
