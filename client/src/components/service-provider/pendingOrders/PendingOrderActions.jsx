"use client";

import PrimaryButton from "@/components/Shared/Button/PrimaryButton";
import ContactModal from "../../property-owner/maintenance-request/ContactModal";
import { useState } from "react";

const PendingOrderActions = () => {
  const [isModalOpened, setModalOpened] = useState(false);
  const handleOpen = () => setModalOpened(true);

  return (
    <>
      <div className="space-y-3.5 flex flex-col">
        <PrimaryButton title={"Accept"} />
        <PrimaryButton title="Contact" onClickHandler={handleOpen} />
      </div>
      {/* contact Modal */}
      {isModalOpened && <ContactModal isModalOpened={isModalOpened} setModalOpened={setModalOpened} />}
    </>
  );
};

export default PendingOrderActions;
