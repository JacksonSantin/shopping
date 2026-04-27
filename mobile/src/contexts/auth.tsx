import React, { createContext, useState, useEffect, useContext } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface RegisterProps {
  nome: string;
  email: string;
  usuario: string;
  senha: string;
}

interface SiginProps {
  usuario: string;
  senha: string;
}

interface AuthContextProps {
  id: number;
  signed: boolean;
  loading: boolean;
  setId(id: number): void;
  register(params: RegisterProps): Promise<{ status: number; message: string }>;
  sigin(params: SiginProps): Promise<{ status: number; message: string }>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [id, setId] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storaged = await AsyncStorage.getItem('@shopping:token');
      const userId = await AsyncStorage.getItem('@shopping:id');

      if (storaged) {
        api.defaults.headers.Authorization = `Bearer ${storaged}`;

        setToken(storaged);
        setId(Number(userId));
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const register = async (params: RegisterProps) => {
    const { nome, email, usuario, senha } = params;
    try {
      const response = await api.post('/usuarios', {
        nome,
        email,
        usuario,
        senha,
      });

      setToken(response.data.token);
      setId(response.data.id);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem('@shopping:id', String(response.data.id));
      await AsyncStorage.setItem('@shopping:token', response.data.token);

      return { status: response.status, message: '' };
    } catch (error) {
      return {
        status: error.response?.status || 400,
        message:
          error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor',
      };
    }
  };

  const sigin = async (params: SiginProps) => {
    const { usuario, senha } = params;
    try {
      const response = await api.post('/sessao', {
        usuario,
        senha,
      });

      setToken(response.data.token);
      setId(response.data.id);

      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem('@shopping:id', String(response.data.id));
      await AsyncStorage.setItem('@shopping:token', response.data.token);

      return { status: response.status, message: '' };
    } catch (error) {
      return {
        status: error.response?.status || 400,
        message:
          error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor',
      };
    }
  };

  const signOut = () => {
    AsyncStorage.clear().then(() => {
      setToken(null);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        id,
        signed: token === null ? false : true,
        loading,
        setId,
        sigin,
        signOut,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
