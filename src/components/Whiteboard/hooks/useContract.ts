import { ethers } from "ethers";
import { useState } from "react";
import useSigner from "./useSigner";
import whiteboardAbi, { CONTRACT_ADDRESS } from "../contracts";

export const useContract = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const signer = useSigner();

  if (!contract) {
    const ethContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      whiteboardAbi,
      signer
    );
    setContract(ethContract);
  }

  return contract;
};
