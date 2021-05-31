import React from "react";
import { useContract } from "./hooks/useContract";
import { Board } from "./Board";

type LoadContractProps = {};

export const LoadContract: React.FC<LoadContractProps> = () => {
  const contract = useContract();

  return (
    <div>
      {!contract && <div>Contract loading... </div>}
      {contract && <Board contract={contract} />}
    </div>
  );
};
