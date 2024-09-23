import privateRequest from "../config/axios.config";

export const getStatistics = async () =>
  privateRequest
    .get<Statistics>("/admin/dashboard/statistics")
    .then((res) => res.data);
