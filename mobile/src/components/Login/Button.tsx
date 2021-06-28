import React, { memo } from 'react';
import { Button as NativeButton, Text } from 'native-base';

import { theme } from '../../assets/utils/theme';
import styles from '../../assets/components/stylesButton';

type Props = React.ComponentProps<typeof NativeButton> & { title: string };

const Button = ({ bordered, style, title, ...props }: Props) => (
  <NativeButton
    full
    style={[
      styles.button,
      {
        backgroundColor: bordered ? theme.colors.surface : theme.colors.primary,
      },
      style,
    ]}
    bordered={bordered}
    {...props}
  >
    <Text
      style={[
        styles.text,
        { color: bordered ? theme.colors.primary : theme.colors.secondary },
      ]}
    >
      {title}
    </Text>
  </NativeButton>
);

export default memo(Button);
