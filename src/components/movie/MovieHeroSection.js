import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import { FONT_SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

const FALLBACK_POSTER = require('../../../assets/popcorn.png');

const MovieHeroSection = ({
  movie,
  posterUri,
  rating,
  title,
  year,
  duration,
  genres,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={posterUri ? { uri: posterUri } : FALLBACK_POSTER}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <View style={styles.heroGradient} />
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={16} color={COLORS.accent} />
        <Text style={styles.ratingBadgeText}>{rating}</Text>
      </View>

      <View style={styles.overlayRow}>
        <Image
          source={posterUri ? { uri: posterUri } : FALLBACK_POSTER}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.heroTextGroup}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.metaRow}>
            {year ? (
              <View style={styles.metaItem}>
                <Ionicons
                  name="calendar-outline"
                  size={16}
                  color={COLORS.text}
                />
                <Text style={styles.metaSmallText}>{year}</Text>
              </View>
            ) : null}
            {duration ? (
              <View style={styles.metaItem}>
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={COLORS.text}
                />
                <Text style={styles.metaSmallText}>{duration}</Text>
              </View>
            ) : null}
            {genres ? (
              <View style={styles.metaItem}>
                <Ionicons
                  name="film-outline"
                  size={16}
                  color={COLORS.text}
                />
                <Text style={styles.metaSmallText}>{genres}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SPACING.lg,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    position: 'relative',
    height: 280,
  },
  heroImageWrapper: {
    height: 220,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(10,12,16,0.75)',
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  ratingBadgeText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    marginLeft: SPACING.xs,
    fontWeight: '600',
  },
  overlayRow: {
    position: 'absolute',
    bottom: SPACING.lg,
    left: SPACING.lg,
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: SPACING.lg,
  },
  thumbnail: {
    width: 110,
    height: 150,
    borderRadius: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderWidth: 3,
    borderColor: COLORS.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  heroTextGroup: {
    flex: 1,
    paddingBottom: SPACING.sm,
  },
  movieTitle: {
    color: COLORS.text,
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  metaSmallText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
});

export default MovieHeroSection;

