"use client";

import tenantLoginImage from "@/assets/loginPage/Login- Tenant.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Button, Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useState } from "react";
import Link from "next/link";

const styles = {
  width: 300,
  marginBottom: 10,
};

const style = {
  width: 300,
};

const LoginPage = () => {
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex justify-between items-center flex-col md:flex-row">
      <div className="bg-[#29429f] w-full md:w-6/12 md:h-[100vh] flex justify-center items-center">
        <Image
          objectFit="cover"
          src={tenantLoginImage}
          alt="Tenant Login Image"
        />
      </div>
      <div className="w-full md:w-3/5 ml-10 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-5xl md:mt-0 mt-5 mb-10 font-semibold">Sign In</h2>
        </div>
        <div>
          <InputGroup style={styles}>
            <InputGroup.Addon>
              <AvatarIcon />
            </InputGroup.Addon>
            <Input />
          </InputGroup>
        </div>
        <div>
          <InputGroup inside style={style}>
            <Input type={visible ? "text" : "password"} />
            <InputGroup.Button onClick={handleChange}>
              {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </div>
        <div className="mt-10">
          <Button appearance="primary">Sign In</Button>
        </div>
        <div className="mt-20">
          <p className="font-semibold">
            Need an Account?{" "}
            <Link className="text-blue-800" href="/tenant/sign-up">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
