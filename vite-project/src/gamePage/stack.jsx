import Block from "./block";

const Stack = ({ stack, onClick }) => {
  return (
    <div
      className="stack"
      style={{ "--pct": stack.extra / stack.blocks.length }}
    >
      <svg className="pie" viewBox="0 0 14 14">
        <use href="#pie" />
      </svg>
      {stack.blocks.map((block, idx) => (
        <Block key={idx} block={block} onClick={() => onClick(idx)} />
      ))}
    </div>
  );
};
export default Stack;
