import { LinkContainer } from "react-router-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const BackButton = ({ url }) => {
  return (
    <LinkContainer to={url} className="mb-4">
      <Button variant="primary">
        <FaArrowLeft /> Go Back
      </Button>
    </LinkContainer>
  );
};

export default BackButton;
