import read from 'co-read';
/**
 *  derived from juliangruber/co-from-stream
 */
function coStream(stream) {
  return function*(end) {
    if (end) {
      if (stream.end)
        stream.end();
      else if (stream.close)
        stream.close();
      else if (stream.destroy)
        stream.destroy();
      return;
    }
    return yield read(stream);
  };
}
export default coStream;
