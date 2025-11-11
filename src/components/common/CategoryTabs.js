import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useTheme } from '../../context/ThemeContext';

const CategoryTabs = ({ tabs, activeTab, onTabPress }) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                isActive ? styles.tabTextActive : styles.tabTextInactive,
              ]}
            >
              {tab.label}
            </Text>
            {isActive && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: SPACING.xl,
    },
    tabItem: {
      alignItems: 'center',
      flex: 1,
    },
    tabText: {
      fontSize: FONT_SIZES.md,
      fontWeight: '600',
      marginBottom: SPACING.xs,
    },
    tabTextActive: {
      color: colors.text,
    },
    tabTextInactive: {
      color: colors.textSecondary,
    },
    tabIndicator: {
      height: 3,
      width: '60%',
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
  });

export default CategoryTabs;

