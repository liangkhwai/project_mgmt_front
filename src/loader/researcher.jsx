export async function getList() {
  const researcherList = await fetch("http://localhost:8080/researcher/list", {
    method: "get",
  });

  const dataResearcherList = await researcherList.json();
  console.log(dataResearcherList);

  const roomList = await fetch('http://localhost:8080/categories/list',{
    method:'get'
  })

  const dataRoomList = await roomList.json()


  if (researcherList.status === 200 && roomList.status === 200) {
    return {dataResearcherList,dataRoomList}
  }
  return { message: "error" };
}
