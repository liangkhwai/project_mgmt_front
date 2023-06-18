// import React from 'react'

// const getOneUser = () => {
//     const { isLoading, error, data, status } = useQuery("getOneUser", () => {
//         fetch("http://localhost:8080/researcher/getOne", {
//           method: "GET",
//           credentials: "include",
//         }).then((res) => {
//           res.json();
//         });
//       });
//       if (isLoading) return "Loading...";

//       if (error) return "An error has occurred: " + error;
//   return (
//     <div>getOneUser</div>
//   )
// }

// export default getOneUser