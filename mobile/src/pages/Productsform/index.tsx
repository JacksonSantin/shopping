import React, { useEffect, useState } from 'react';
import ModalSelector from 'react-native-modal-selector';

import styles from '../../assets/pages/stylesProductsForm';

import { useNavigation, useRoute } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text';

import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { RectButton } from 'react-native-gesture-handler';

function Productsform() {
  const navigate = useNavigation();
  const route = useRoute() as any;
  const { id } = useAuth();

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [total, setTotal] = useState('');
  const [estabelecimento, setEstabelecimento] = useState({
    key: '',
    label: '',
  });
  const [listaEstabelecimento, setListaEstabelecimento] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!route.params?.id) return;

    const show = async () => {
      try {
        const response = await api.get(`/produtos/${route.params?.id}`);

        const { data } = response;

        setNome(data.nome);
        setQuantidade(String(data.quantidade));
        setValorUnitario(data.valor_unitario);
        setTotal(data.total);
      } catch (error) {
        setErrorMessage(
          error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor'
        );
      }
    };

    show();
  }, []);

  useEffect(() => {
    const handleCalculateTotal = () => {
      if (
        quantidade === undefined ||
        valorUnitario === undefined ||
        valorUnitario === ''
      )
        return;

      const total = (
        parseInt(quantidade) *
        parseFloat(valorUnitario.split(' ')[1].replace(',', '.'))
      ).toFixed(2);

      setTotal(total);
    };

    handleCalculateTotal();
  }, [quantidade, valorUnitario]);

  useEffect(() => {
    const index = async () => {
      try {
        const response = await api.get(
          `/products-register/establishments/${id}`
        );

        setListaEstabelecimento(response.data);
        setEstabelecimento({
          key: response.data[1].key || '',
          label: response.data[1].label || '',
        });
      } catch (error) {
        setErrorMessage(
          error.response?.data.message ||
          'Houve um problema ao tentar se conectar com servidor'
        );
      }
    };

    index();
  }, []);

  function goBack() {
    navigate.goBack();
  }

  const handleUpdate = async () => {
    if (
      nome.length === 0 ||
      quantidade.length === 0 ||
      valorUnitario.length === 0
    ) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await api.put(`/produtos/${route.params?.id}`, {
        nome,
        quantidade,
        valor_unitario: valorUnitario,
        total,
        id_estabelecimento: estabelecimento.key,
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
      quantidade.length === 0 ||
      valorUnitario.length === 0
    ) {
      setErrorMessage('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await api.post('/produtos', {
        nome,
        quantidade,
        valorUnitario,
        total,
        estabelecimento: estabelecimento.key,
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
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>
      <ModalSelector
        style={styles.inputModalSelector}
        data={listaEstabelecimento}
        initValue={estabelecimento.label}
        initValueTextStyle={{ color: '#8FA7B3' }}
        visible={false}
        cancelButtonAccessible={false}
        animationType='fade'
        cancelText="Voltar"
        onChange={(option: any) =>
          setEstabelecimento({ key: option.key, label: option.label })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Nome*"
        value={nome}
        onChangeText={(text) => setNome(text)}
        clearButtonMode="always"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade*"
        keyboardType={'numeric'}
        value={quantidade}
        onChangeText={(text) => setQuantidade(text)}
        clearButtonMode="always"
      />
      <TextInputMask
        style={styles.input}
        placeholder="Valor Unitário*"
        keyboardType={'numeric'}
        clearButtonMode="always"
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: '',
        }}
        value={valorUnitario}
        onChangeText={(text) => {
          setValorUnitario(text);
        }}
      />

      <TextInputMask
        style={styles.input}
        placeholder="Total"
        keyboardType={'numeric'}
        clearButtonMode="always"
        editable={false}
        type={'money'}
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: 'R$ ',
          suffixUnit: '',
        }}
        value={total}
        onChangeText={(text) => {
          setValorUnitario(text);
        }}
      />

      <Text style={styles.errorMessage}>{errorMessage}</Text>

      <RectButton style={styles.nextButton} onPress={() => { !route.params?.id ? handleSave() : handleUpdate(); }}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}
export default Productsform;
