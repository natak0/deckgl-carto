const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL;
const accessToken: string = import.meta.env.VITE_API_ACCESS_TOKEN;
const connectionName: string = 'carto_dw';

export const cartoConfig = {
  apiBaseUrl,
  accessToken,
  connectionName,
};
