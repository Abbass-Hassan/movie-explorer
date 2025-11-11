import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const ErrorScreen = ({ message, onRetry }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },
  retryText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default ErrorScreen;
