import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';

const screenWidth = Dimensions.get('window').width;
const containerPadding = SPACING.lg * 2;
const columnGaps = SPACING.lg * 2;
const availableWidth = screenWidth - containerPadding - columnGaps;
export const CARD_WIDTH = availableWidth / 3;

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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

