import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`${
        note.isStaff ? "bg-primary" : "bg-secondary"
      } text-white px-3 py-2 rounded shadow-sm mb-4`}
    >
      <div className="d-flex justify-content-between">
        <h4>
          Note from{" "}
          {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
        </h4>
        <div>{new Date(note.createdAt).toLocaleString("en-IN")}</div>
      </div>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteItem;
