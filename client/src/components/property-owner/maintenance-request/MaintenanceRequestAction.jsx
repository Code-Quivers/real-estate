"use client";

import PrimaryButton from "@/components/Shared/Button/PrimaryButton";
import { useState } from "react";
import ContactModal from "./ContactModal";

const MaintenanceRequestAction = () => {
  const [isModalOpened, setModalOpened] = useState(false);
  const handleOpen = () => setModalOpened(true);

  return (
    <>
      <div className="space-y-3.5 flex flex-col">
        <PrimaryButton title={"Accept"} />
        <PrimaryButton title={"Contact"} onClickHandler={handleOpen} />
        <PrimaryButton title={"Reject"} />
      </div>
      {/* contact Modal */}
      {open && (
        <ContactModal
          isModalOpened={isModalOpened}
          setModalOpened={setModalOpened}
        />
      )}
    </>
  );
};

export default MaintenanceRequestAction;
