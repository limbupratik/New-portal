
// utils/cache.js
import NodeCache from "node-cache";
export const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 }); // 5 minutes
export const withCache = async (key, fn) => {
  const hit = cache.get(key);
  if (hit) return hit;
  const data = await fn();
  cache.set(key, data);
  return data;
};
