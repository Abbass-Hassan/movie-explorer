import React, { useMemo } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onFocus,
  inputRef,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color={colors.textSecondary}
        style={styles.icon}
      />
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: SPACING.md,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
    },
    input: {
      flex: 1,
      color: colors.text,
      fontSize: FONT_SIZES.md,
      paddingVertical: SPACING.xs,
    },
    icon: {
      marginRight: SPACING.sm,
    },
  });

export default SearchBar;

