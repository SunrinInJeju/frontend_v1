import { getAPI } from ".";

export async function requestJoin(req: { tell: string }) {
  const res = await getAPI.post("/auth/request", req);
  return res.data;
}

export async function login(req: { username: string; password: string }) {
  const res = await getAPI.post("/auth/login", req);
  getAPI.defaults.headers.common["Authorization"] = res.data.message.key;
  return res.data.message.key;
}

export async function getUser() {
  const res = await getAPI.get("/companies");
  return res.data;
}

export async function confirmTell(req: { tell: string; confirmCode: string }) {
  const res = await getAPI.post("/auth/confirm", req);
  return res.data;
}

export async function register(req: {
  tell: string;
  confirmCode: string;
  businessName: string;
  businessNumber: string;
  username: string;
  password: string;
}) {
  const res = await getAPI.post("/auth/join", req);
  return res.data;
}
