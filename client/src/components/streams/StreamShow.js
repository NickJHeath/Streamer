import React, { useEffect, useRef, useCallback } from "react";
import flv from "flv.js";
import { useSelector, useDispatch } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const stream = useSelector((state) => state.streams[id]);
  const videoRef = useRef();
  const player = useRef();

  const buildPlayer = useCallback(() => {
    if (player.current || !stream) {
      return;
    }
    player.current = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.current.attachMediaElement(videoRef.current);
    player.current.load();
  }, [id, stream]);

  useEffect(() => {
    dispatch(fetchStream(id));
    buildPlayer();
    return () => {
      return player.current.destroy();
    };
  }, [buildPlayer, dispatch, id]);

  if (!stream) return <div>Loading...</div>;
  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls={true} />
      <h1>{stream.title}</h1>
      <h5>{stream.description}</h5>
    </div>
  );
};

export default StreamShow;
