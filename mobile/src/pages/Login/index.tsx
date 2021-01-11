import React, { memo, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import Background from '../../components/Login/Background';
import Logo from '../../components/Login/Logo';
import Header from '../../components/Login/Header';
import Button from '../../components/Login/Button';
import TextInput from '../../components/Login/TextInput';

import { senhaValidator, usuarioValidator } from '../../utils/utils';

import styles from './styles';

import { Navigation } from '../../utils/types';
import { useAuth } from '../../contexts/auth';

type Props = {
  navigation: Navigation;
};

const Login = ({ navigation }: Props) => {
  const [usuario, setUsuario] = useState({ value: '', error: '' });
  const [senha, setSenha] = useState({ value: '', error: '' });
  const [alert, setAlert] = useState('');

  const { sigin } = useAuth();

  const handleLogin = async () => {
    const response = await sigin({
      usuario: usuario.value,
      senha: senha.value,
    });

    if (response.status !== 201) {
      setAlert(response.message);
      return;
    }

    navigation.navigate('Landing');
  };

  const _onLoginPressed = () => {
    const usuarioError = usuarioValidator(usuario.value);
    const senhaError = senhaValidator(senha.value);

    if (usuarioError || senhaError) {
      setUsuario({ ...usuario, error: usuarioError });
      setSenha({ ...senha, error: senhaError });
      return;
    }

    handleLogin();
  };

  return (
    <Background>
      <Logo />

      <Header>SHOPPING</Header>

      <TextInput
        label="Usuário"
        returnKeyType="next"
        value={usuario.value}
        onChangeText={(text) => setUsuario({ value: text, error: '' })}
        error={!!usuario.error}
        errorText={usuario.error}
        autoCapitalize="none"
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

      {alert !== '' && <Text style={styles.alert}>{alert}</Text>}

      <Button title="Login" onPress={_onLoginPressed} />

      <View style={styles.row}>
        <Text style={styles.label}>Ainda não possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default memo(Login);
