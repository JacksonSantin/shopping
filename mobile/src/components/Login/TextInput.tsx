import React, { memo } from 'react';
import { Text, TextInput as NativeInput } from 'react-native';
import { Input, Item, Label } from 'native-base';

import { theme } from '../../assets/utils/theme';
import styles from '../../assets/components/stylesTextInput';

type Props = React.ComponentProps<typeof NativeInput> & {
  error?: boolean;
  label?: string;
  errorText?: string;
};

const TextInput = ({ label, errorText, ...props }: Props) => (
  <>
    <Item floatingLabel style={styles.container}>
      <Label style={styles.label}>{label}</Label>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        {...props}
      />
    </Item>
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </>
);

export default memo(TextInput);
