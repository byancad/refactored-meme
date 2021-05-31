import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

type EditBoardProps = {
  updateWhiteboard: (value: string) => void;
  setShowContents: (flag: boolean) => void;
};
export const EditBoard: React.FC<EditBoardProps> = ({
  updateWhiteboard,
  setShowContents,
}) => {
  const [newContents, setNewContents] = useState<string>("");
  const update = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateWhiteboard(newContents);
  };
  return (
    <div className="mrg-top">
      <Form onSubmit={update}>
        <Form.Group controlId="new-contents">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="What would you like to write on whiteboard?"
            value={newContents}
            onChange={(event) => {
              setNewContents(
                event.currentTarget.value
                  ? event.currentTarget.value.toString()
                  : ""
              );
            }}
          />
        </Form.Group>
        <Button className="submit-btn full" variant="primary" type="submit">
          Save
        </Button>
      </Form>
      <Button
        variant="secondary"
        className="full sm-mrg-top"
        onClick={() => {
          setShowContents(true);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};
