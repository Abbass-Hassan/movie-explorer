import { StyleSheet, Dimensions } from 'react-native';
import { SPACING } from '../constants/spacing';

const screenWidth = Dimensions.get('window').width;
const containerPadding = SPACING.lg * 2;
const columnGaps = SPACING.lg * 2;
const availableWidth = screenWidth - containerPadding - columnGaps;
export const CARD_WIDTH = availableWidth / 3;

export const createGlobalStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.xxl,
      paddingBottom: SPACING.xl,
    },
    gridContent: {
      rowGap: SPACING.lg,
    },
    gridColumn: {
      columnGap: SPACING.lg,
      justifyContent: 'flex-start',
    },
    emptyGridContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 120,
    },
  });
