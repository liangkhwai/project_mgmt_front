export default function UpdateButton(props) {
  const handleClick = (e) => {
    props.onClick();
  };
  return (
    <button
      className="bg-yellow-600 px-3 py-1 rounded-lg text-white shadow-lg hover:bg-yellow-500  "
      onClick={(e)=>handleClick(e)}
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
    <button className="bg-red-600 px-3 py-1 rounded-lg text-white shadow-lg  hover:bg-red-500 " onClick={handleClick}>
      {props.children}
    </button>
  );
}

export function AddButton(props) {
  const handleClick = () => {
    props.onClick();
  };
  return (
    <button className="bg-green-600 px-4 py-1 rounded-lg text-white shadow-lg hover:bg-green-500" onClick={handleClick}>
      {props.children}
    </button>
  );
}
export function SaveButton(props) {
    const handleClick = () => {
      props.onClick();
    };
    return (
      <button className="bg-blue-600 px-3 py-1 rounded-lg text-white shadow-lg hover:bg-blue-500  " onClick={handleClick}>
        {props.children}
      </button>
    );
  }

  export function CancelButton(props) {
    const handleClick = () => {
      props.onClick();
    };
    return (
      <button className="bg-red-600 px-2 py-1  rounded-lg text-white shadow-lg hover:bg-red-500 " onClick={handleClick}>
        {props.children}
      </button>
    );
  }