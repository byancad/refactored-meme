import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TokenInitialState } from "../../store/token/reducers";
import { InitialState } from "../../store/index";
import { getLinkToken } from "../../store/token/actions";

type LinkTokenProps = {};

export const LinkToken: React.FC<LinkTokenProps> = () => {
  const tokenState = useSelector<InitialState, TokenInitialState>(
    state => state.token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLinkToken());
  }, [dispatch]);

  return <div>Link Token:{tokenState.linkToken}</div>;
};
