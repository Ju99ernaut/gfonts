// jshint ignore: start

const Meta = ({ font }) => {
  const variants = font.variants.length;
  let text = font.family + ' - ' + variants;

  if (variants === 1) {
    text += ' Style';
  } else {
    text += ' Styles';
  }

  return (
    <div className="meta">
      <span className="family">
        {text}
      </span>
    </div>
  );
};

export default Meta;