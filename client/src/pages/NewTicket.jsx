import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import { createTicket, reset } from "../features/tickets/ticketSlice";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, navigate, isError, isSuccess, message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <div className="auth-card mx-auto auth-card">
        <section id="heading" className="text-center">
          <h1 className="d-flex align-items-center justify-content-center display-6 fw-bold gap-2">
            Create New Ticket
          </h1>
          <p className="lead fw-semibold text-secondary">
            Please fill out the form below
          </p>
        </section>
        <section id="form">
          <Form>
            <Form.Group className="mb-3" controlId="customerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" value={name} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="customerEmail">
              <Form.Label>Customer Email</Form.Label>
              <Form.Control type="email" value={email} disabled />
            </Form.Group>
          </Form>

          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="productName">Product Name</Form.Label>
              <Form.Select
                id="productName"
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="iPhone">iPhone</option>
                <option value="Macbook Pro">Macbook Pro</option>
                <option value="iMac">iMac</option>
                <option value="iPad">iPad</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                placeholder="Write Description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Stack>
              <Button value="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </Form>
        </section>
      </div>
    </>
  );
};

export default NewTicket;
