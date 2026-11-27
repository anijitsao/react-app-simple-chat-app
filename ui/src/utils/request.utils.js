
const connectBackend = async (config) => {
  const url = config.url;
  delete config["url"];
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error("Unable to fetch results from backend");
  }
  const data = await response.json();
  return data;
};

export { connectBackend };
