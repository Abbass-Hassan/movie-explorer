import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { FONT_SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { getMovieById } from '../api/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import {
  buildGenres,
  extractYear,
  extractDuration,
  extractRating,
  getMovieIdentifier,
  getMoviePosterUri,
  getMovieTitle,
} from '../utils/helpers';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';
import ScreenHeader from '../components/common/ScreenHeader';
import MovieHeroSection from '../components/movie/MovieHeroSection';
import TabBar from '../components/common/TabBar';

const TABS = [
  { key: 'about', label: 'About Movie' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'cast', label: 'Cast' },
];

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { movieId, movie: initialMovie } = route.params ?? {};

  const [movie, setMovie] = useState(initialMovie ?? null);
  const [loading, setLoading] = useState(!initialMovie);
  const [error, setError] = useState(null);

  const id = movieId ?? initialMovie?.id ?? initialMovie?.movieId;

  // Handle numeric IDs from favorites API - these don't exist in /Movies endpoint
  // so we use the initialMovie data directly instead of fetching
  const fetchDetails = useCallback(async () => {
    if (initialMovie && initialMovie.title && initialMovie.description) {
      setMovie(initialMovie);
      setLoading(false);
      setError(null);
      return;
    }

    const isNumericId = id && String(id).match(/^\d+$/);

    if (isNumericId && initialMovie) {
      setMovie(initialMovie);
      setLoading(false);
      setError(null);
      return;
    }

    if (!id && !initialMovie) {
      setError('Movie not found.');
      setLoading(false);
      return;
    }

    if (!id) {
      setMovie(initialMovie);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getMovieById(id);
      if (data) {
        setMovie(data);
      } else if (initialMovie) {
        setMovie(initialMovie);
      } else {
        setError('Unable to load movie details.');
      }
    } catch (err) {
      if (initialMovie) {
        setMovie(initialMovie);
        setError(null);
      } else {
        setError('Unable to load movie details.');
      }
    } finally {
      setLoading(false);
    }
  }, [id, initialMovie]);

  useEffect(() => {
    if (initialMovie) {
      if (initialMovie.title && initialMovie.description) {
        setMovie(initialMovie);
        setLoading(false);
        setError(null);
        return;
      }

      const isNumericId = id && String(id).match(/^\d+$/);

      if (isNumericId) {
        setMovie(initialMovie);
        setLoading(false);
        setError(null);
        return;
      }

      setMovie(initialMovie);
      setLoading(false);
      if (id) {
        fetchDetails();
      }
    } else if (id) {
      fetchDetails();
    } else {
      setError('Movie not found.');
      setLoading(false);
    }
  }, [fetchDetails, initialMovie, id]);

  const isFavorited = useMemo(() => {
    if (!movie) return false;
    const identifier = getMovieIdentifier(movie);
    return identifier ? isFavorite(identifier) : false;
  }, [isFavorite, movie, favorites]);

  const handleToggleFavorite = useCallback(() => {
    if (!movie) {
      Alert.alert('Error', 'Movie data not available');
      return;
    }

    const identifier = getMovieIdentifier(movie);
    if (!identifier) {
      Alert.alert('Error', 'Movie identifier not available');
      return;
    }

    if (isFavorited) {
      removeFavorite(identifier)
        .then(() => {
          Alert.alert('Success', 'Removed from favorites');
        })
        .catch(() => {
          Alert.alert('Error', 'Could not remove movie. Please try again.');
        });
    } else {
      addFavorite(movie)
        .then(() => {
          Alert.alert('Success', 'Added to favorites');
        })
        .catch(() => {
          Alert.alert('Error', 'Could not save movie. Please try again.');
        });
    }
  }, [addFavorite, isFavorited, movie, removeFavorite]);

  const posterUri = getMoviePosterUri(movie);
  const title = getMovieTitle(movie);
  const rating = extractRating(movie);
  const genres = buildGenres(movie);
  const year = extractYear(movie);
  const duration = extractDuration(movie);
  const description =
    movie?.overview ?? movie?.description ?? movie?.synopsis ?? 'No synopsis.';

  if (loading) {
    return <LoadingScreen />;
  }

  if (error && !movie) {
    return <ErrorScreen message={error} onRetry={fetchDetails} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeader
        title="Detail"
        onBack={() => navigation.goBack()}
        onAction={handleToggleFavorite}
        actionIcon={isFavorited ? 'bookmark' : 'bookmark-outline'}
        actionDisabled={!movie || loading}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <MovieHeroSection
          movie={movie}
          posterUri={posterUri}
          rating={rating}
          title={title}
          year={year}
          duration={duration}
          genres={genres}
        />

        <TabBar tabs={TABS} activeTab={TABS[0].key} />

        {error ? (
          <View style={styles.errorContainerInline}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchDetails}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.description}>{description}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    lineHeight: FONT_SIZES.md * 1.6,
  },
  errorContainerInline: {
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.md,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SPACING.md,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
  },
  retryText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default DetailsScreen;
