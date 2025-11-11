import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const TabBar = ({ tabs, activeTab }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <View
            key={tab.key}
            style={isActive ? styles.tabItemActive : styles.tabItem}
          >
            <Text
              style={isActive ? styles.tabItemActiveText : styles.tabItemText}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.tabIndicator} />}
          </View>
        );
      })}
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: SPACING.lg,
    },
    tabItemActive: {
      marginRight: SPACING.xl,
      alignItems: 'flex-start',
    },
    tabItemActiveText: {
      color: colors.text,
      fontSize: FONT_SIZES.md,
      fontWeight: '600',
    },
    tabIndicator: {
      marginTop: SPACING.xs,
      width: '60%',
      height: 3,
      borderRadius: 2,
      backgroundColor: colors.text,
    },
    tabItem: {
      marginRight: SPACING.xl,
    },
    tabItemText: {
      color: colors.textSecondary,
      fontSize: FONT_SIZES.md,
      fontWeight: '500',
    },
  });

export default TabBar;

