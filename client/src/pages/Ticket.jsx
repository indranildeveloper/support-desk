import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import {
  getTicket,
  openTicket,
  closeTicket,
  reset,
} from "../features/tickets/ticketSlice";
import Button from "react-bootstrap/esm/Button";

const Ticket = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  const handleOpenTicket = () => {
    dispatch(openTicket(ticketId));
    toast.success("Ticket Opened!");
    navigate("/tickets");
  };

  const handleClearTicket = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed!");
    navigate("/tickets");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div>
        <header className="mb-4">
          <BackButton url={"/tickets"} />
          <div className="d-flex justify-content-between mb-3">
            <h2>Ticket ID: {ticket._id}</h2>
            <h4>
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
            </h4>
          </div>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-IN")}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="border p-2 bg-light rounded shadow-sm">
            <h3>Description of Issue:</h3>
            <p>{ticket.description}</p>
          </div>
        </header>

        <Stack direction="horizontal" gap={2}>
          {ticket.status !== "open" && (
            <Button variant="warning" onClick={() => handleOpenTicket()}>
              Open Ticket
            </Button>
          )}

          {ticket.status !== "closed" && (
            <Button variant="danger" onClick={() => handleClearTicket()}>
              Close Ticket
            </Button>
          )}
        </Stack>
      </div>
    </>
  );
};

export default Ticket;
