import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const SearchBar = ({ value, onChangeText, placeholder = 'Search', onFocus, inputRef }) => {
  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Ionicons
        name="search"
        size={20}
        color={COLORS.textSecondary}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    paddingVertical: SPACING.xs,
  },
  icon: {
    marginLeft: SPACING.xs,
  },
});

export default SearchBar;

