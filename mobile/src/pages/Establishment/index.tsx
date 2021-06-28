import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { View, Text, ScrollView } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  FlatList,
  RectButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import styles from '../../assets/pages/stylesEstablishment';
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        <FlatList
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
                <Feather name="trash-2" size={24} color="#ff669d" />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </ScrollView>
      <View style={styles.addButton}>
        <RectButton style={styles.createToDoList} onPress={handleNavigationAdd}>
          <Feather name="plus" size={20} color="#E5E5E5" />
        </RectButton>
      </View>
    </View>
  );
}

export default Establishment;
