import React from "react";
import connectors from "./connectors";
import Web3Provider from "web3-react";
import { LoadWeb3Context } from "./LoadWeb3Context";

type WhiteBoardProps = {};

export const WhiteBoard: React.FC<WhiteBoardProps> = () => {
  return (
    <Web3Provider connectors={connectors} libraryName="ethers.js">
      <LoadWeb3Context />
    </Web3Provider>
  );
};
