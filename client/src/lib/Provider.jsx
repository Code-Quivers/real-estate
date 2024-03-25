"use client";
import { InternetDisconnectedMessage } from "@/components/others/InternetDisconnectedMessage";
import store from "@/redux/store";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <InternetDisconnectedMessage />
      {children}
    </Provider>
  );
};

export default Providers;
