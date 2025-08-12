import apiClient from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const accountService = {
    // Get all accounts
    getAccounts: async () => {
        const response = await apiClient.get(API_ENDPOINTS.ACCOUNTS.BASE);
        return response.data;
    },

    // Get account by ID
    getAccountById: async (id) => {
        const response = await apiClient.get(API_ENDPOINTS.ACCOUNTS.BY_ID(id));
        return response.data;
    },

    // Create new account
    createAccount: async (accountData) => {
        const response = await apiClient.post(API_ENDPOINTS.ACCOUNTS.BASE, accountData);
        return response.data;
    },

    // Update account
    updateAccount: async (id, accountData) => {
        const response = await apiClient.put(API_ENDPOINTS.ACCOUNTS.BY_ID(id), accountData);
        return response.data;
    },

    // Delete account
    deleteAccount: async (id) => {
        const response = await apiClient.delete(API_ENDPOINTS.ACCOUNTS.BY_ID(id));
        return response.data;
    },

    // Update account status
    updateAccountStatus: async ({ id, isActive }) => {
        const response = await apiClient.patch(`${API_ENDPOINTS.ACCOUNTS.BY_ID(id)}/status`, { isActive });
        return response.data;
    }
};
