import { getAPI } from ".";

export async function getPipelineList() {
  const res = await getAPI.get("/pipeline");
  return res.data;
}

export async function getPipeInfo(id: string) {
  const res = await getAPI.get(
    `https://supsup.plebea.com/companies?pipelineId=${id}`
  );
  return res.data[0];
}
