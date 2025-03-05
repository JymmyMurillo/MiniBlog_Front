import api from "./api";
import { toast } from "react-hot-toast";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/register", userData);
    toast.success("Registro exitoso!");
    return response.data;
  } catch (error) {
    toast.error("Error en el registro");
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/login", credentials);
    toast.success("Bienvenido!");
    return response.data;
  } catch (error) {
    toast.error("Credenciales inválidas");
    throw error;
  }
};
