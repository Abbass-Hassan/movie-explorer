import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const ErrorScreen = ({ message, onRetry }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: SPACING.xl,
    },
    errorText: {
      color: colors.error,
      fontSize: FONT_SIZES.md,
      marginBottom: SPACING.lg,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: colors.primary,
      borderRadius: SPACING.md,
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.sm,
    },
    retryText: {
      color: colors.text,
      fontSize: FONT_SIZES.md,
      fontWeight: '600',
    },
  });

export default ErrorScreen;
