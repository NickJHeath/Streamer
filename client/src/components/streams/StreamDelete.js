import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream, deleteStream } from "../../actions";

const StreamDelete = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const stream = useSelector((state) => state.streams[id]);

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const renderActions = () => {
    return (
      <React.Fragment>
        <button
          onClick={() => dispatch(deleteStream(id))}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  const renderContent = () => {
    if (!stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete this stream with title: ${stream.title}`;
  };

  return (
    <Modal
      title="Delete Stream"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={() => history.push("/")}
    />
  );
};

export default StreamDelete;
