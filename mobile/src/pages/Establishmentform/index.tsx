import React, { useEffect, useState } from 'react';

import styles from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

function Establishmentform() {
  const navigate = useNavigation();
  const route = useRoute() as any;
  const { id } = useAuth();

  const [nome, setNome] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!route.params.id) return;

    const show = async () => {
      try {
        const response = await api.get(`/estabelecimento/${route.params.id}`);

        const { data } = response;

        setNome(data.nome);
        setRua(data.rua);
        setNumero(String(data.numero));
        setComplemento(data.complemento);
        setCidade(data.cidade);
        setBairro(data.bairro);
      } catch (error) {
        console.log(error);
      }
    };
    show();
  }, []);

  function goBack() {
    navigate.goBack();
  }

  const handleUpdate = async () => {
    if (
      nome.length === 0 ||
      rua.length === 0 ||
      cidade.length === 0 ||
      bairro.length === 0
    ) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await api.put(`/estabelecimento/${route.params.id}`, {
        nome,
        rua,
        numero,
        complemento,
        cidade,
        bairro,
      });

      navigate.goBack();
    } catch (error) {
      setErrorMessage(
        error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor'
      );
    }
  };

  const handleSave = async () => {
    if (
      nome.length === 0 ||
      rua.length === 0 ||
      cidade.length === 0 ||
      bairro.length === 0
    ) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await api.post(`/estabelecimento`, {
        nome,
        rua,
        numero,
        complemento,
        cidade,
        bairro,
        id_usuario: id,
      });

      navigate.goBack();
    } catch (error) {
      setErrorMessage(
        error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Estabelecimentos</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome*"
          value={nome}
          onChangeText={(text) => setNome(text)}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          placeholder="Rua*"
          value={rua}
          onChangeText={(text) => setRua(text)}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          keyboardType={'numeric'}
          value={numero}
          onChangeText={(text) => setNumero(text)}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          placeholder="Complemento"
          value={complemento}
          onChangeText={(text) => setComplemento(text)}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          placeholder="Cidade*"
          value={cidade}
          onChangeText={(text) => setCidade(text)}
          clearButtonMode="always"
        />
        <TextInput
          style={styles.input}
          placeholder="Bairro*"
          value={bairro}
          onChangeText={(text) => setBairro(text)}
          clearButtonMode="always"
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              !route.params.id ? handleSave() : handleUpdate();
            }}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={goBack}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}
export default Establishmentform;
