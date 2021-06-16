import React, {
  useEffect,
  useCallback,
  useState,
  FunctionComponent,
} from "react";
import { useDispatch } from "react-redux";
import { getLinkToken } from "../../store/token/actions";
import { useTokenState } from "../../store/hooks";

import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";
type LinkTokenProps = {};

export const LinkToken: React.FC<LinkTokenProps> = () => {
  const tokenState = useTokenState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinkToken());
  }, [dispatch]);

  const token = tokenState.linkToken;
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (public_token, metadata) => {
      // send public_token to server
    },
    []
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    // onExit
    // onEvent
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div>
      Link Token:{tokenState.linkToken}
      <div>
        <div>
          <button onClick={() => open()} disabled={!token}>
            Connect a bank account
          </button>
        </div>
      </div>
    </div>
  );
};
