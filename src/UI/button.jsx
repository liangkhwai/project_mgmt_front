export default function UpdateButton(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button
      className="bg-yellow-300 px-3 py-1 rounded-xl"
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
}

export function DeleteButton(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button className="bg-red-400 px-3 py-1 rounded-xl " onClick={handleClick}>
      {props.children}
    </button>
  );
}

export function AddButton(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button className="bg-green-400 px-3 py-1 rounded-xl " onClick={handleClick}>
      {props.children}
    </button>
  );
}
export function SaveButton(props) {
    const handleClick = () => {
      props.onClick();
    };
    return (
      <button className="bg-red-400 px-3 py-1 rounded-xl " onClick={handleClick}>
        {props.children}
      </button>
    );
  }

  export function CancelButton(props) {
    const handleClick = () => {
      props.onClick();
    };
    return (
      <button className="bg-red-400 px-3 py-1 rounded-xl " onClick={handleClick}>
        {props.children}
      </button>
    );
  }