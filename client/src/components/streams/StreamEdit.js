import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const stream = useSelector((state) => {
    return state.streams[props.match.params.id];
  });

  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const onSubmit = (formValues) => {
    props.editStream(id, formValues);
  };

  if (!this.props.stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={_.pick(stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default StreamEdit;
