import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill up all the fields!");
    }
  };

  return (
    <Card className="p-4 mx-auto auth-card">
      <section id="heading" className="text-center">
        <h1 className="d-flex align-items-center justify-content-center display-6 fw-bold gap-2">
          <FaSignInAlt /> Log In
        </h1>
        <p className="lead fw-semibold text-secondary">Log In to get support</p>
      </section>
      <section id="form">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-2" controlId="email">
            <Form.Label>Your Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Stack>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </Form>
      </section>
    </Card>
  );
};

export default Login;
