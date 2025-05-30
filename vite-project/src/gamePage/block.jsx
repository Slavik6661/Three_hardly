const Block = ({ block, onClick }) => {
  return (
    <div className="block" data-type={block.type} onClick={onClick}>
      <div>{block.type}</div>
    </div>
  );
};

export default Block;
