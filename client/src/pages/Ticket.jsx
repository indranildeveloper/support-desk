import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";
import { getTicket, reset } from "../features/tickets/ticketSlice";

const Ticket = () => {
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <>
      <div>
        <header>
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
          <hr />
          <div className="border p-2 bg-light rounded shadow-sm">
            <h3>Description of Issue:</h3>
            <p>{ticket.description}</p>
          </div>
        </header>
      </div>
    </>
  );
};

export default Ticket;
