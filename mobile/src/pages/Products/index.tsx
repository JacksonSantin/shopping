import React, { useEffect, useState } from 'react';
import ModalSelector from 'react-native-modal-selector';

import { View, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  FlatList,
  RectButton,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from '../../assets/pages/stylesProducts';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

interface IProduct {
  id_produto: number;
  nome: string;
  comprado: boolean;
}

function Establishment() {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const { id } = useAuth();

  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false);
  const [estabelecimento, setEstabelecimento] = useState({
    key: '',
    label: 'Sem filtro',
  });
  const [listaEstabelecimento, setListaEstabelecimento] = useState([]);

  const show = async () => {
    try {
      const response = await api.get(`todos-produtos/${id}`);

      const { data } = response;

      setProducts(data);
    } catch (error) { }
  };

  useEffect(() => {
    show();
  }, [isFocused]);

  useEffect(() => {
    const index = async () => {
      try {
        const response = await api.get(
          `/products-register/establishments/${id}`
        );

        setListaEstabelecimento(response.data);
      } catch (error) { }
    };

    index();
  }, []);

  async function handleShowProductByEstablishment() {
    try {
      const response = await api.get(
        `filter-product-by-establishment/${estabelecimento.key}`
      );

      setProducts(response.data);
    } catch (error) { }
  }

  useEffect(() => {
    if (estabelecimento.key === '' && estabelecimento.label === '') return;

    handleShowProductByEstablishment();
  }, [estabelecimento.key]);

  function handleNavigationProducts(id: number) {
    navigate.navigate('Productsform', { id });
  }


  async function handleDelete(id: number) {
    try {
      await api.delete(`/produtos/${id}`);

      const filteredProducts = products.filter(
        (product) => product.id_produto !== id
      );

      setProducts(filteredProducts);
    } catch (error) { }
  }

  async function handleUpdateBuyProduct(id_produto: number, buy?: boolean) {
    try {
      await api.put(`/comprar-produto/${id_produto}`, { comprado: buy });
    } catch (error) { }

    return true;
  }

  async function handleToggleCheckbox(id_produto: number) {
    let buy;
    const p = products.map((product: IProduct) => {
      if (product.id_produto === id_produto) {
        product.comprado = !product.comprado;
        buy = product.comprado;
      }

      return product;
    });

    await handleUpdateBuyProduct(id_produto, buy);

    setProducts([...p]);
  }

  return (
    <>
      <View style={styles.container}>

        <View style={styles.inputGroup}>
          <View style={styles.inputBlock}>
            <View style={styles.iconAndText}>
              <Feather name="filter" size={20} color="#FCA311" />
              <Text style={styles.label}>Estabelecimento</Text>
            </View>
            <ModalSelector
              visible={false}
              data={listaEstabelecimento}
              initValue={estabelecimento.label}
              cancelButtonAccessible={false}
              cancelText="Voltar"
              onChange={(option: any) => {
                setEstabelecimento({
                  key: option.key,
                  label: option.label,
                });
              }}
            />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          <FlatList
            data={products}
            renderItem={({ item }: any) => (
              <View key={item.id_produto} style={styles.itemView}>
                <View style={styles.productTitle}>
                  <CheckBox
                    value={item.comprado}
                    onChange={() => handleToggleCheckbox(item.id_produto)}
                  />

                  <Text
                    style={[
                      styles.item,
                      item.comprado
                        ? { textDecorationLine: 'line-through' }
                        : {},
                    ]}
                    onPress={() => handleNavigationProducts(item.id_produto)}
                  >
                    {item.nome}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id_produto)}
                >
                  <Feather name="trash-2" size={24} color="#ff669d" />
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
        <View style={styles.addButton}>
          <RectButton style={styles.createToDoList} onPress={() => navigate.navigate('Productsform')}>
            <Feather name="plus" size={20} color="#E5E5E5" />
          </RectButton>
        </View>
      </View>
    </>
  );
}

export default Establishment;
