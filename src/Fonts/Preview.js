// jshint ignore: start

const Preview = ({ text, font }) => {
  const fontFamily = font.family;
  const style = {
    fontFamily: "'" + fontFamily + "'"
  };

  if (text === "Font Name") {
    text = fontFamily;
  }

  return (
    <div className="preview" style={style}>
      <div><span>{text}</span></div>
    </div>
  );
};

export default Preview;