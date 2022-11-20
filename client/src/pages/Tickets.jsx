import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";
import { getTickets, reset } from "../features/tickets/ticketSlice";

const Tickets = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <h1>Tickets</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Products</th>
            <th>Status</th>
            <th>View Ticket</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Tickets;
