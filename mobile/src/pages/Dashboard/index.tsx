import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import api from '../../services/api';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import { Text } from 'native-base';
import { useAuth } from '../../contexts/auth';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const { id } = useAuth();

  useEffect(() => {
    const index = async () => {
      try {
        const response = await api.get(`relatorios/${id}`);

        setProducts(response.data);
      } catch (error) {}
    };

    index();
  }, []);

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7
    );
  const pieData = products.map((product: any, index) => ({
    value: product.quantidade,
    svg: {
      fill: product.color,
    },
    key: `${index}-${product.quantidade}`,
  }));

  const Label = ({ slices }: any) => {
    return slices.map((slice: any, index: any) => {
      const { pieCentroid, data } = slice;

      console.log(slice);

      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="black"
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={22}
        >
          {data.value}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <PageHeader title="Relatório" />
      {products?.length > 0 ? (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          <Text style={styles.description}>Produto/Quantidade</Text>
          <PieChart
            style={{
              marginTop: 18,
              height: 200,
            }}
            data={pieData}
          />
          <Text style={styles.legendTitle}>Legenda</Text>
          {products.map((product: any) => (
            <View key={product.id_produto} style={styles.legend}>
              <View
                style={[styles.square, { backgroundColor: product.color }]}
              />
              <Text style={styles.legendValue}>
                {product.nome + ': Qtd = ' + product.quantidade}
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.test}>Sem produtos cadastrados</Text>
      )}
    </View>
  );
}

export default Dashboard;
