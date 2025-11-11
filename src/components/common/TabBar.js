import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const TabBar = ({ tabs, activeTab }) => {
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

const styles = StyleSheet.create({
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
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  tabIndicator: {
    marginTop: SPACING.xs,
    width: '60%',
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.text,
  },
  tabItem: {
    marginRight: SPACING.xl,
  },
  tabItemText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
});

export default TabBar;

