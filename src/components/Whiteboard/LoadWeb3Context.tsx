import React from "react";
import { useWeb3Context } from "web3-react";
import { LoadContract } from "./LoadContract";

type LoadWeb3ContextProps = {};

export const LoadWeb3Context: React.FC<LoadWeb3ContextProps> = () => {
  const context = useWeb3Context();

  React.useEffect(() => {
    if (!context.active) {
      context.setFirstValidConnector(["MetaMask"]);
    }
  }, [context]);

  {
    return context?.account ? <LoadContract /> : <div />;
  }
};
