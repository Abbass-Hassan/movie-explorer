import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const CategoryTabs = ({ tabs, activeTab, onTabPress }) => {
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

const styles = StyleSheet.create({
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
    color: COLORS.text,
  },
  tabTextInactive: {
    color: COLORS.textSecondary,
  },
  tabIndicator: {
    height: 3,
    width: '60%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});

export default CategoryTabs;

