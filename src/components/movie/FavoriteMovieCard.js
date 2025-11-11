import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
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
import { useTheme } from '../../context/ThemeContext';

const FALLBACK_POSTER = require('../../../assets/popcorn.png');

const FavoriteMovieCard = ({ movie, onPress, onLongPress }) => {
  const posterUri = getMoviePosterUri(movie);
  const title = getMovieTitle(movie);
  const rating = extractRating(movie);
  const genre = buildGenres(movie);
  const year = extractYear(movie);
  const duration = extractDuration(movie);
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
          <Ionicons name="star" size={16} color={colors.accent} />
          <Text style={styles.cardRating}>{rating}</Text>
        </View>
        {genre ? (
          <View style={styles.metaRow}>
            <Ionicons name="bookmark" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>{genre}</Text>
          </View>
        ) : null}
        {year ? (
          <View style={styles.metaRow}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.metaText}>{year}</Text>
          </View>
        ) : null}
        {duration ? (
          <View style={styles.metaRow}>
            <Ionicons
              name="time-outline"
              size={14}
              color={colors.textSecondary}
            />
            <Text style={styles.metaText}>{duration}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    card: {
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
      backgroundColor: colors.surface,
    },
    cardContent: {
      flex: 1,
      paddingLeft: SPACING.md,
      justifyContent: 'flex-start',
    },
    cardTitle: {
      color: colors.text,
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
      color: colors.accent,
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
      color: colors.text,
      fontSize: FONT_SIZES.sm,
      fontWeight: '400',
    },
  });

export default FavoriteMovieCard;

