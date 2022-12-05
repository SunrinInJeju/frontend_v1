import { getAPI } from ".";

export async function getProducts(req: { id: string }) {
  const res = await getAPI.get(`/products/${req.id}`);
  return res.data;
}
