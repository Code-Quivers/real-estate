import { Button } from "rsuite";

const PrimaryButtonForTenant = ({
  title,
  btnLoading,
  btnType,
  onClickHandler,
}) => {
  return (
    <Button
      onClick={onClickHandler ?? null}
      loading={btnLoading}
      type={btnType ?? "button"}
      className={`!px-6 !py-2 !bg-[#29429f] !text-white !rounded-none `}
      size="lg"
      appearance="default"
    >
      {title}
    </Button>
  );
};

export default PrimaryButtonForTenant;
