import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const ScreenHeader = ({
  title,
  onBack,
  onAction,
  actionIcon,
  actionDisabled = false,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const renderBackButton = () => {
    if (typeof onBack === 'function') {
      return (
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
      );
    }

    return <View style={styles.placeholder} />;
  };

  return (
    <View style={styles.container}>
      {renderBackButton()}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onAction}
        disabled={actionDisabled}
      >
        {actionIcon && (
          <Ionicons
            name={actionIcon}
            size={24}
            color={actionDisabled ? colors.textSecondary : colors.text}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.surface,
    },
    button: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
      fontSize: FONT_SIZES.lg,
      fontWeight: '600',
      flex: 1,
      textAlign: 'center',
    },
    placeholder: {
      width: 40,
      height: 40,
    },
  });

export default ScreenHeader;

