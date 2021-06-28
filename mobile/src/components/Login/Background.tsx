import React, { memo } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import styles from '../../assets/components/stylesBackground';

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => (
  <View style={styles.background}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </View>
);

export default memo(Background);
