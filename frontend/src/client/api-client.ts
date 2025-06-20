import axios from "axios";
import { toast } from "sonner";

const defaultUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: defaultUrl,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        toast.error(data.error, {
          description: "Verifique os dados e tente novamente.",
          duration: 5000,
        });
      }
      if (status === 401 || status === 403) {
        toast.error(data.error, {
          duration: 5000,
        });
      }
      if (status === 404) {
        toast.error(data.error, {
          description: "O recurso solicitado não foi encontrado.",
          duration: 5000,
        });
      }
      if (status === 500) {
        toast.error("Erro interno do servidor.", {
          description:
            "Ocorreu um erro no servidor. Tente novamente mais tarde.",
          duration: 5000,
        });
      }
    } else {
      toast.error("Erro de conexão.", {
        description: "Não foi possível conectar ao servidor.",
        duration: 5000,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
