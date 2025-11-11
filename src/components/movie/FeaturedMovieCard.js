import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { getMoviePosterUri, getMovieTitle } from '../../utils/helpers';

const FALLBACK_POSTER = require('../../../assets/popcorn.png');

const FeaturedMovieCard = ({ movie, onPress, isSelected = false, rank }) => {
  const posterUri = getMoviePosterUri(movie);
  const title = getMovieTitle(movie);

  const handlePress = () => {
    onPress(movie);
  };

  return (
    <View style={[styles.wrapper, isSelected && styles.wrapperActive]}>
      {typeof rank === 'number' && (
        <Text style={[styles.rankLabel, isSelected && styles.rankLabelActive]}>
          {rank}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardActive]}
        onPress={handlePress}
        activeOpacity={0.85}
      >
        <Image
          source={posterUri ? { uri: posterUri } : FALLBACK_POSTER}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 170,
    position: 'relative',
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xxl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  wrapperActive: {
    shadowOpacity: 0.28,
  },
  card: {
    width: '100%',
    borderRadius: SPACING.lg,
    overflow: 'hidden',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  cardActive: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: SPACING.lg,
    backgroundColor: 'transparent',
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  rankLabel: {
    position: 'absolute',
    bottom: -SPACING.lg,
    left: SPACING.sm,
    fontSize: 108,
    fontWeight: '800',
    color: '#5CA7FF',
    opacity: 0.55,
    zIndex: 2,
    pointerEvents: 'none',
  },
  rankLabelActive: {
    opacity: 0.7,
  },
});

export default FeaturedMovieCard;

