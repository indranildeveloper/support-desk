import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;
