import data from "../data/data.json" with { type: "json" };
import type { Data } from "../typings";

export async function getAllData() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return data as Data[];
}
