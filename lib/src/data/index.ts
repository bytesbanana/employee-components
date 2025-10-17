import data from "../data/data.json" with { type: "json" };
import type { Data } from "../typings";

export async function getAllData() {
  return data as Data[];
}
