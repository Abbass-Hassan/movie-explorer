export const defaultScreenOptions = {
  headerShown: false,
};

export const createTabBarOptions = (colors) => ({
  headerShown: false,
  tabBarStyle: {
    backgroundColor: colors.background,
    borderTopColor: colors.surface,
  },
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textSecondary,
  tabBarLabelStyle: {
    fontSize: 12,
  },
});

export default defaultScreenOptions;

