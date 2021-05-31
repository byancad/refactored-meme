import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import { EditBoard } from "./EditBoard";
import { Button, Form, Spinner } from "react-bootstrap";

type BoardProps = {
  contract: ethers.Contract;
};

export const Board: React.FC<BoardProps> = ({ contract }) => {
  const [boardContents, setBoardContents] = useState<string>("");
  const [boardContentsAuthor, setBoardContentsAuthor] =
    useState<string | undefined>();
  const [showContents, setShowContents] = useState<boolean>(true);
  const [writing, setWriting] = useState<boolean>(false);

  const getCurrentValue = useCallback(async () => {
    var response = await contract.getContents();
    setBoardContents(response.whiteBoardContents);
    setBoardContentsAuthor(response.contentsAuthor);
  }, [contract]);

  const updateWhiteboard = async (value: string) => {
    var txn = await contract.setContents(value.toString());
    setWriting(true);
    setShowContents(true);
    await txn.wait(1);
    getCurrentValue();
    setWriting(false);
  };

  useEffect(() => {
    getCurrentValue();
  }, [getCurrentValue]);

  return (
    <div>
      {showContents && writing && (
        <div className="center full">
          <Spinner animation="border" variant="light" size="sm" /> Saving on
          chain. This may take a minute.
        </div>
      )}
      {showContents && !writing && (
        <div className="mrg-top">
          <Form.Group controlId="contents">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={boardContents}
              readOnly
            />
          </Form.Group>
          Author: {boardContentsAuthor}
          <div className="center">
            {" "}
            <Button
              className="mrg-top"
              onClick={() => {
                setShowContents(false);
              }}
            >
              Write on White Board
            </Button>
          </div>
        </div>
      )}

      {!showContents && (
        <EditBoard
          updateWhiteboard={updateWhiteboard}
          setShowContents={setShowContents}
        />
      )}
    </div>
  );
};
