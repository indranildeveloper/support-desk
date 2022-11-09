import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <div className="auth-card mx-auto">
      <section id="heading" className="text-center">
        <h1 className="d-flex align-items-center justify-content-center display-6 fw-bold gap-2">
          What do you need help with?
        </h1>
        <p className="lead fw-semibold text-secondary">
          Please choose an option below
        </p>
      </section>
      <Stack gap={3}>
        <LinkContainer to="/new-ticket">
          <Button variant="primary">
            <FaQuestionCircle /> Create new ticket
          </Button>
        </LinkContainer>
        <LinkContainer to="/tickets">
          <Button variant="secondary">
            <FaTicketAlt /> Create new ticket
          </Button>
        </LinkContainer>
      </Stack>
    </div>
  );
};

export default Home;
