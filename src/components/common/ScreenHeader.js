import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const ScreenHeader = ({
  title,
  onBack,
  onAction,
  actionIcon,
  actionDisabled = false,
}) => {
  const renderBackButton = () => {
    if (typeof onBack === 'function') {
      return (
        <TouchableOpacity style={styles.button} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
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
            color={actionDisabled ? COLORS.textSecondary : COLORS.text}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.text,
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

