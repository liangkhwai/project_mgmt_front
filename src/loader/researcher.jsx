export async function getList() {
  const response = await fetch("http://localhost:8080/researcher/list", {
    method: "get",
  });

  const data = await response.json();
  console.log(data);

  if (response.status === 200) {
    return data;
  }
  return {message:'error'}
}
