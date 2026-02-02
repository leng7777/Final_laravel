// import { useEffect } from "react";

// export default function Toast({ message, type = "success", onClose, duration = 2500 }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, duration);

//     return () => clearTimeout(timer);
//   }, [onClose, duration]);

//   const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
//       <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto`}>
//         {message}
//       </div>
//     </div>
//   );
// }