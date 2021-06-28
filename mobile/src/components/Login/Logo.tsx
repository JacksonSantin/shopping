import React, { memo } from 'react';
import { Image } from 'react-native';

import styles from '../../assets/components/stylesLogo';

const Logo = () => (
  <Image source={require('../../assets/images/shopping_128.png')} style={styles.image} />
);

export default memo(Logo);
