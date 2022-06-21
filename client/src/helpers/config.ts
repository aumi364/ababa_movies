const convertToQueryString = (query: any) => {
  const [queryArr] = Object.entries(query);

  return `${queryArr[0]}=${queryArr[1]}`;
};
const createQueryParams = (endpoint: string, query: any) => {
  const queryKeys = Object.keys(query);
  const firstQueryKey = queryKeys?.shift();
  let url =
    endpoint +
    "?" +
    convertToQueryString({
      [firstQueryKey as any]: query[firstQueryKey as any],
    });
  queryKeys?.forEach((queryKey, index) => {
    if (
      query[queryKey] !== null &&
      query[queryKey] !== undefined &&
      query[queryKey] !== "null" &&
      query[queryKey] !== "undefined"
    ) {
      url = url + "&" + convertToQueryString({ [queryKey]: query[queryKey] });
    }
  });
  return url;
};

const configUrl = ({ endpoint, query }: any) => {
  if (!query || Object.keys(query).length === 0) {
    return endpoint;
  }
  return createQueryParams(endpoint, query);
};

export default configUrl;
