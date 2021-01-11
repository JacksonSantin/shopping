import React, { useEffect, useState } from 'react';

import { TextInputMask } from 'react-native-masked-text';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';

import dashboardIcon from '../../assets/images/icons/dashboard.png';

import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../../services/api';
import { Button } from 'native-base';
import { useAuth } from '../../contexts/auth';

function Usercad() {
  const { navigate } = useNavigation();
  const [message, setMessage] = useState({
    class: '',
    message: '',
  });

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [cpf, setCpf] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');

  const { id } = useAuth();

  useEffect(() => {
    const show = async () => {
      try {
        const response = await api.get(`/usuarios/${id}`);

        const { data } = response;

        setNome(data.nome);
        setEmail(data.email);
        setUsuario(data.usuario);
        setCpf(data.cpf);
        setRua(data.rua);
        setNumero(data.numero && String(data.numero));
        setComplemento(data.complemento);
        setCidade(data.cidade);
        setBairro(data.bairro);
      } catch (error) {
        setMessage({
          class: 'error',
          message:
            error.response?.data.message ||
            'Houve um problema ao tentar se conectar com servidor',
        });
      }
    };
    show();
  }, []);

  function goBack() {
    navigate('Landing');
  }

  function handleReports() {
    navigate('Dashboard');
  }

  const handleSubmit = async () => {
    try {
      await api.put(`/usuarios/${id}`, {
        nome,
        usuario,
        cpf,
        rua,
        numero,
        complemento,
        cidade,
        bairro,
      });

      setMessage({
        class: 'success',
        message: 'Informações atualizadas com sucesso',
      });
    } catch (error) {
      setMessage({
        class: 'error',
        message:
          error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor',
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Usuários</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
            clearButtonMode="always"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            editable={false}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(text) => setEmail(text)}
            clearButtonMode="always"
          />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={(text) => setUsuario(text)}
            clearButtonMode="always"
          />
          <TextInputMask
            style={styles.input}
            placeholder="CPF"
            clearButtonMode="always"
            type={'cpf'}
            value={cpf}
            onChangeText={(text) => {
              setCpf(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Rua"
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
            placeholder="Cidade"
            value={cidade}
            onChangeText={(text) => setCidade(text)}
            clearButtonMode="always"
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={(text) => setBairro(text)}
            clearButtonMode="always"
          />

          <Text
            style={[
              styles.message,
              { color: message.class === 'success' ? 'green' : '#f00' },
            ]}
          >
            {message.message}
          </Text>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={goBack}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonReport} onPress={handleReports}>
            <Image source={dashboardIcon} style={styles.buttonDashboard} />
            <Text style={styles.buttonText}>Relatórios</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    </ScrollView>
  );
}
export default Usercad;
