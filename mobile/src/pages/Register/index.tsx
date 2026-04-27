import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Background from '../../components/Login/Background';
import Logo from '../../components/Login/Logo';
import Header from '../../components/Login/Header';
import Button from '../../components/Login/Button';
import TextInput from '../../components/Login/TextInput';

import styles from '../../assets/pages/stylesRegister';

import { Navigation } from '../../utils/types';

import {
  emailValidator,
  senhaValidator,
  nomeValidator,
  usuarioValidator,
} from '../../utils/utils';
import { useAuth } from '../../contexts/auth';
import { Feather } from '@expo/vector-icons';

type Props = {
  navigation: Navigation;
};

const Register = ({ navigation }: Props) => {
  const [nome, setNome] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [senha, setSenha] = useState({ value: '', error: '' });
  const [usuario, setUsuario] = useState({ value: '', error: '' });
  const [alert, setAlert] = useState('');

  const { register } = useAuth();

  const handleRegister = async () => {
    const response = await register({
      nome: nome.value,
      email: email.value,
      usuario: usuario.value,
      senha: senha.value,
    });

    if (response.status !== 201) {
      setAlert(response.message);
      return;
    }

    navigation.navigate('Landing');
  };

  const _onSignUpPressed = () => {
    const nomeError = nomeValidator(nome.value);
    const emailError = emailValidator(email.value);
    const senhaError = senhaValidator(senha.value);
    const usuarioError = usuarioValidator(usuario.value);

    if (emailError || senhaError || nomeError || usuarioError) {
      setNome({ ...nome, error: nomeError });
      setEmail({ ...email, error: emailError });
      setSenha({ ...senha, error: senhaError });
      setUsuario({ ...usuario, error: usuarioError });
      return;
    }

    handleRegister();
  };

  return (
    <Background>
      <Logo />

      <Header>Criar uma conta</Header>

      <TextInput
        label="Nome"
        returnKeyType="next"
        value={nome.value}
        onChangeText={(text) => setNome({ value: text, error: '' })}
        error={!!nome.error}
        errorText={nome.error}
      />

      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Usuário"
        returnKeyType="next"
        value={usuario.value}
        onChangeText={(text) => setUsuario({ value: text, error: '' })}
        error={!!usuario.error}
        errorText={usuario.error}
      />

      <TextInput
        label="Senha"
        returnKeyType="done"
        value={senha.value}
        onChangeText={(text) => setSenha({ value: text, error: '' })}
        error={!!senha.error}
        errorText={senha.error}
        secureTextEntry
      />

      {alert !== '' && <View style={styles.errorMessage}><Feather name="x-octagon" size={24} color="#f00000" /><Text style={styles.alert}>{alert}</Text></View>}

      <Button
        title="Cadastrar"
        onPress={_onSignUpPressed}
        style={styles.button}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(Register);
