import { COLORS } from '../constants/colors';

export const defaultScreenOptions = {
  headerShown: false,
};

export const tabBarOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: COLORS.background,
  },
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.textSecondary,
  tabBarLabelStyle: {
    fontSize: 12,
  },
};

export default defaultScreenOptions;

