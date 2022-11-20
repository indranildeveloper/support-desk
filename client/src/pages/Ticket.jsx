import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { FaPlus } from "react-icons/fa";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";
import Loading from "../components/Loading";
import {
  getTicket,
  openTicket,
  closeTicket,
  reset,
} from "../features/tickets/ticketSlice";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/notes/noteSlice";
import Button from "react-bootstrap/esm/Button";

const Ticket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticketId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.note
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNoteSubmit = () => {
    dispatch(createNote({ noteText, ticketId }));
    handleModalClose();
    setNoteText("");
  };

  if (isLoading || notesIsLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="mb-4">
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
          <div className="border p-3 bg-light shadow-sm">
            <h3>Description of Issue:</h3>
            <p>{ticket.description}</p>
          </div>
        </header>

        {ticket.status !== "close" && (
          <Button
            variant="success"
            className="mb-2"
            onClick={() => handleModalOpen()}
          >
            <FaPlus /> Add Note
          </Button>
        )}

        <h2>Notes:</h2>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}

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

      {/* Modal */}
      <Modal show={isModalOpen} onHide={() => handleModalClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addNote" className="mb-2">
              <Form.Label>Add your Note:</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Note text"
                rows={4}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            onClick={() => handleNoteSubmit()}
          >
            <FaPlus /> Add Note
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Modal */}
    </div>
  );
};

export default Ticket;
