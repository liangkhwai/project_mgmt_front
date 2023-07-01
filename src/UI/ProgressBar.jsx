export default function ProgressBar({ percent }) {
  return (
    <div className="bg-gray-300 rounded-full overflow-hidden h-2 w-32 mx-auto">
      <div
        className="bg-blue-500 h-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
