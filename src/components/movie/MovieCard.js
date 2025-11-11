import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { getMoviePosterUri, getMovieTitle } from '../../utils/helpers';

const FALLBACK_POSTER = require('../../../assets/popcorn.png');

const MovieCard = ({ movie, onPress, isFavorite = false, width }) => {
  const posterUri = getMoviePosterUri(movie);
  const title = getMovieTitle(movie);

  const cardStyle = width ? [styles.card, { width }] : styles.card;

  return (
    <TouchableOpacity
      style={[cardStyle, isFavorite && styles.cardFavorite]}
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image
        source={posterUri ? { uri: posterUri } : FALLBACK_POSTER}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SPACING.md,
    padding: SPACING.xs,
    alignItems: 'center',
  },
  cardFavorite: {
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: SPACING.md,
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  title: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default MovieCard;

