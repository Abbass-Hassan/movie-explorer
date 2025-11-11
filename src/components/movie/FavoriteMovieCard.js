import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import {
  getMoviePosterUri,
  getMovieTitle,
  extractRating,
  buildGenres,
  extractYear,
  extractDuration,
} from '../../utils/helpers';

const FALLBACK_POSTER = require('../../../assets/popcorn.png');

const FavoriteMovieCard = ({ movie, onPress, onLongPress }) => {
  const posterUri = getMoviePosterUri(movie);
  const title = getMovieTitle(movie);
  const rating = extractRating(movie);
  const genre = buildGenres(movie);
  const year = extractYear(movie);
  const duration = extractDuration(movie);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(movie)}
      onLongPress={() => onLongPress(movie)}
      activeOpacity={0.8}
    >
      <Image
        source={posterUri ? { uri: posterUri } : FALLBACK_POSTER}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.accent} />
          <Text style={styles.cardRating}>{rating}</Text>
        </View>
        {genre ? (
          <View style={styles.metaRow}>
            <Ionicons name="bookmark" size={14} color={COLORS.textSecondary} />
            <Text style={styles.metaText}>{genre}</Text>
          </View>
        ) : null}
        {year ? (
          <View style={styles.metaRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={COLORS.textSecondary}
            />
            <Text style={styles.metaText}>{year}</Text>
          </View>
        ) : null}
        {duration ? (
          <View style={styles.metaRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={COLORS.textSecondary}
            />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: SPACING.md,
    overflow: 'visible',
    marginBottom: SPACING.lg,
    flexDirection: 'row',
    padding: 0,
  },
  poster: {
    width: 100,
    height: 140,
    borderRadius: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  cardContent: {
    flex: 1,
    paddingLeft: SPACING.md,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  cardRating: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  metaText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '400',
  },
});

export default FavoriteMovieCard;

