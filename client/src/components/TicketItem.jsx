import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { LinkContainer } from "react-router-bootstrap";

const TicketItem = ({ ticket }) => {
  return (
    <tr>
      <td>{new Date(ticket.createdAt).toLocaleString("en-IN")}</td>
      <td>{ticket.product}</td>
      <td>
        <Badge
          bg={
            ticket.status === "closed"
              ? "danger"
              : ticket.status === "open"
              ? "warning"
              : "success"
          }
        >
          {ticket.status}
        </Badge>
      </td>
      <td>
        <LinkContainer to={`/tickets/${ticket._id}`}>
          <Button variant="outline-primary" size="sm">
            View
          </Button>
        </LinkContainer>
      </td>
    </tr>
  );
};

export default TicketItem;
