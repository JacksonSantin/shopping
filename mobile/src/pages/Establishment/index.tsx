import React, { useEffect, useState } from 'react';

import { View, Image, Text, Alert, ScrollView } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  BorderlessButton,
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import addIcon from '../../assets/images/icons/add_64.png';
import deleteIcon from '../../assets/images/icons/delete.png';

import PageHeader from '../../components/PageHeader';

import styles from './styles';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

function Establishment() {
  const { navigate } = useNavigation();
  const isFocused = useIsFocused();
  const { id } = useAuth();

  const [establishments, setEstablishments] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');

  const index = async () => {
    try {
      const response = await api.get(`/todos-estabelecimentos/${id}`);

      const { data } = response;

      setEstablishments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    index();
  }, [isFocused]);

  function handleNavigationAdd(id: number) {
    navigate('Establishmentform', { id });
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/estabelecimentos/${id}`);

      index();
    } catch (error) {
      setErrorMessage(error.response?.data.message);

      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Estabelecimentos" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <FlatList
          style={styles.listItem}
          data={establishments}
          renderItem={({ item }: any) => (
            <View key={item.id_estabelecimento} style={styles.itemView}>
              <Text
                style={styles.item}
                onPress={() => handleNavigationAdd(item.id_estabelecimento)}
              >
                {item.nome}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id_estabelecimento)}
              >
                <Image
                  source={deleteIcon}
                  resizeMode="contain"
                  style={styles.deleteIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </ScrollView>
      <View style={styles.addButton}>
        <BorderlessButton onPress={handleNavigationAdd}>
          <Image source={addIcon} resizeMode="contain" />
        </BorderlessButton>
      </View>
    </View>
  );
}

export default Establishment;
