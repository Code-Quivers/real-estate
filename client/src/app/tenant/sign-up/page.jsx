"use client";

import tenantLoginImage from "@/assets/loginPage/SignUp- Tenant.png";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Image from "next/image";
import { Button, Input, InputGroup } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useState } from "react";
import Link from "next/link";
import EmailFillIcon from "@rsuite/icons/EmailFill";
import { FaLock } from "react-icons/fa";
const style = {
  width: "300px",
  borderRadius: "20px !important",
  overflow: "hidden !important",
};

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };

  const handleChange2 = () => {
    setVisible2(!visible2);
  };
  return (
    <div className="flex justify-between items-center  flex-row">
      <div className="w-full md:w-3/5 ml-10 flex flex-col justify-center items-center">
        <div>
          <h2 className="text-5xl md:mt-0 mt-5 mb-10 font-semibold">Sign Up</h2>
        </div>
        {/* input forms */}

        <div>
          <form>
            <div className="space-y-3">
              <div>
                <InputGroup size="lg" style={style} inside>
                  <InputGroup.Addon>
                    <AvatarIcon />
                  </InputGroup.Addon>
                  <Input placeholder="First Name" />
                </InputGroup>
              </div>
              <div>
                <InputGroup size="lg" style={style} inside>
                  <InputGroup.Addon>
                    <AvatarIcon />
                  </InputGroup.Addon>
                  <Input placeholder="Last Name" />
                </InputGroup>
              </div>
              <div>
                <InputGroup size="lg" style={style} inside>
                  <InputGroup.Addon>
                    <AvatarIcon />
                  </InputGroup.Addon>
                  <Input placeholder="Username" />
                </InputGroup>
              </div>
              <div>
                <InputGroup size="lg" style={style} inside>
                  <InputGroup.Addon>
                    <EmailFillIcon />
                  </InputGroup.Addon>
                  <Input placeholder="Email" />
                </InputGroup>
              </div>
              <div>
                <InputGroup size="lg" style={style} inside>
                  <InputGroup.Addon>
                    <FaLock />
                  </InputGroup.Addon>
                  <Input
                    placeholder="Password"
                    type={visible ? "text" : "password"}
                  />
                  <InputGroup.Button onClick={handleChange}>
                    {visible ? <EyeIcon /> : <EyeSlashIcon />}
                  </InputGroup.Button>
                </InputGroup>
              </div>
              <div>
                <InputGroup
                  size="lg"
                  className="border !border-[#828282]"
                  style={style}
                  inside
                >
                  <InputGroup.Addon>
                    <FaLock />
                  </InputGroup.Addon>
                  <Input
                    placeholder="Confirm Password"
                    type={visible2 ? "text" : "password"}
                  />
                  <InputGroup.Button onClick={handleChange2}>
                    {visible2 ? <EyeIcon /> : <EyeSlashIcon />}
                  </InputGroup.Button>
                </InputGroup>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                type="submit"
                size="lg"
                className="!rounded-full !px-8 !py-3.5 "
                appearance="default"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-5">
          <p className="font-semibold">
            Already have an Account?{" "}
            <Link className="text-blue-800" href="/tenant-login">
              Sign In
            </Link>
          </p>
          <p className="font-semibold text-center">
            Forgot?{" "}
            <Link className="text-blue-800" href="#">
              Reset
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-[#29429f] w-full md:w-6/12 md:h-[100vh] flex justify-center items-center">
        <Image
          objectFit="cover"
          src={tenantLoginImage}
          alt="Tenant Login Image"
        />
      </div>
    </div>
  );
};

export default LoginPage;
