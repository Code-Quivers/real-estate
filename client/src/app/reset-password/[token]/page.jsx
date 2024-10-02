import PasswordReset from "@/components/resetPassword/PasswordReset";
export const metadata = {
  title: "Resetting Password",
};

const ResetPassword = ({ params }) => {
  return (
    <>
      <PasswordReset params={params?.token} />
    </>
  );
};

export default ResetPassword;
