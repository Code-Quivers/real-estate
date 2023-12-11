import { Button } from "rsuite";

const PrimaryButton = ({ title, btnLoading, btnType, onClickHandler }) => {
  return (
    <Button
      onClick={onClickHandler ?? null}
      loading={btnLoading}
      type={btnType ?? "button"}
      className={`!px-12 !py-3 !bg-[#29429f] !text-white !rounded-none `}
      size="lg"
      appearance="default"
    >
      {title}
    </Button>
  );
};

export default PrimaryButton;
