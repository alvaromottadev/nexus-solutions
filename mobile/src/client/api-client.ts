import axios from 'axios';
import { API_URL } from '@env';
import { showToast } from '../utils/showToast';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { logoutEvent } from '../utils/logoutEvent';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        showToast('error', data.error, 'Verifique os dados e tente novamente.');
      }
      if (
        (status === 401 && data.error === 'Token expired') ||
        data.error.includes('Error in JWT authentication:')
      ) {
        showToast(
          'error',
          'Sessão expirada',
          'Por favor, faça login novamente.',
        );
        logoutEvent.emit('logout');
        return;
      }
      if (status === 401 || status === 403) {
        showToast(
          'error',
          data.error,
          'Você não tem permissão para acessar este recurso.',
        );
      }
      if (status === 404) {
        showToast(
          'error',
          'Recurso não encontrado',
          'O recurso solicitado não foi encontrado.',
        );
      }
      if (status === 409) {
        showToast(
          'error',
          'Conflito de dados',
          'Verifique as informações e tente novamente.',
        );
      }
      if (status === 500) {
        showToast(
          'error',
          'Erro interno do servidor',
          'Ocorreu um erro no servidor. Tente novamente mais tarde.',
        );
      }
    } else {
      showToast(
        'error',
        'Erro de conexão',
        'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.',
      );
    }
    return Promise.reject(error);
  },
);

export default api;
