import { Signer } from "ethers";
import { useWeb3Context } from "web3-react";

const useSigner = (): Signer => {
  const { account, library } = useWeb3Context();

  if (!account) {
    throw new Error(
      "[useSigner] This hook can only be used when a signer is available"
    );
  }

  return library.getSigner();
};

export default useSigner;
