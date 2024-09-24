import axios, { AxiosInstance } from 'axios';
import { Environment } from '../environment';
import { loadFromLocalStorage } from '../Models/AppSettings';

let apiClient: AxiosInstance | null;

export function getClient() {
  if (!apiClient) {
    // Load the tokens from AppSettings
    const appSettings = loadFromLocalStorage();
    const token = appSettings.accessToken; // Access token from AppSettings
    const adminToken = appSettings.adminKey; // Admin token from AppSettings

    // Create axios instance with the tokens
    apiClient = axios.create({
      baseURL: Environment.ApiUrl,
      headers: {
        'X-Access-Token': token ?? undefined,
        'X-Admin-Token': adminToken ?? undefined,
      },
    });
  }

  return apiClient;
}

export function resetClient() {
  apiClient = null;
}
