import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FONT_SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { getAllMovies } from '../api/movieApi';
import { useFavorites } from '../context/FavoritesContext';
import {
  filterMoviesByCategory,
  getMovieId,
  searchMovies,
} from '../utils/helpers';
import SearchBar from '../components/common/SearchBar';
import MovieCard from '../components/movie/MovieCard';
import FeaturedMovieCard from '../components/movie/FeaturedMovieCard';
import CategoryTabs from '../components/common/CategoryTabs';
import LoadingScreen from '../components/common/LoadingScreen';
import ErrorScreen from '../components/common/ErrorScreen';
import EmptyState from '../components/common/EmptyState';
import { createGlobalStyles, CARD_WIDTH } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';

const CATEGORY_TABS = [
  { key: 'nowPlaying', label: 'Now playing' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'topRated', label: 'Top rated' },
  { key: 'popular', label: 'Popular' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isFavorite } = useFavorites();
  const { colors, toggleTheme, isDark } = useTheme();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState(CATEGORY_TABS[0].key);
  const [selectedFeaturedId, setSelectedFeaturedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  // Fetch movies on mount and handle pull-to-refresh

  const fetchMovies = useCallback(async () => {
    try {
      setError(null);
      const data = await getAllMovies();
      if (Array.isArray(data)) {
        setMovies(data);
        if (data.length) {
          const candidate = getMovieId(data[0]) ?? data[0];
          setSelectedFeaturedId((prev) =>
            prev ?? (candidate !== undefined ? String(candidate) : null),
          );
        }
      } else {
        setMovies([]);
        setError('Failed to load movies.');
      }
    } catch (err) {
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovies();
  }, [fetchMovies]);

  // Top 10 rated movies for featured carousel
  const featuredMovies = useMemo(() => {
    if (!movies.length) return [];
    const sorted = [...movies].sort(
      (a, b) =>
        (b.rating ?? b.vote_average ?? 0) - (a.rating ?? a.vote_average ?? 0),
    );
    return sorted.slice(0, 10);
  }, [movies]);

  const categoryMovies = useMemo(
    () => filterMoviesByCategory(movies, activeCategory),
    [movies, activeCategory],
  );

  // Apply search filter on top of category filter
  const filteredMovies = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoryMovies;
    }
    return searchMovies(categoryMovies, searchQuery);
  }, [categoryMovies, searchQuery]);

  const navigateToDetails = useCallback(
    (movie) => {
      const movieId = getMovieId(movie);
      navigation.navigate('Details', { movieId, movie });
    },
    [navigation],
  );

  const handleFeaturedMoviePress = useCallback(
    (movie) => {
      const movieId = String(getMovieId(movie) ?? movie.title ?? '');
      setSelectedFeaturedId(movieId);
      navigateToDetails(movie);
    },
    [navigateToDetails],
  );

  const renderFeaturedMovie = useCallback(
    ({ item, index }) => {
      const movieId = String(getMovieId(item) ?? item.title ?? '');
      const isSelected = selectedFeaturedId === movieId;
      return (
        <FeaturedMovieCard
          movie={item}
          onPress={handleFeaturedMoviePress}
          isSelected={isSelected}
          rank={index + 1}
        />
      );
    },
    [handleFeaturedMoviePress, selectedFeaturedId],
  );

  const renderGridMovie = useCallback(
    ({ item }) => {
      const movieId = getMovieId(item);
      const favorite = movieId ? isFavorite(movieId) : false;
      return (
        <MovieCard
          movie={item}
          onPress={navigateToDetails}
          isFavorite={favorite}
          width={CARD_WIDTH}
        />
      );
    },
    [isFavorite, navigateToDetails],
  );

  const keyExtractor = useCallback(
    (item, index) => String(getMovieId(item) ?? index),
    [],
  );

  const globalStyles = useMemo(() => createGlobalStyles(colors), [colors]);
  const themedStyles = useMemo(() => createStyles(colors), [colors]);

  if (loading && !refreshing) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} onRetry={fetchMovies} />;
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={globalStyles.container}
        contentContainerStyle={globalStyles.contentContainer}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={themedStyles.header}>
          <View style={themedStyles.headingRow}>
            <Text style={themedStyles.heading}>What do you want to watch?</Text>
            <TouchableOpacity
              style={themedStyles.themeToggle}
              onPress={toggleTheme}
              accessibilityRole="button"
              accessibilityLabel="Toggle theme"
            >
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={20}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            inputRef={searchInputRef}
          />
        </View>

        {!searchQuery.trim() && (
          <>
            <View style={themedStyles.featuredSection}>
              <FlatList
                data={featuredMovies}
                horizontal
                keyExtractor={keyExtractor}
                renderItem={renderFeaturedMovie}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={themedStyles.featuredContent}
                ItemSeparatorComponent={() => (
                  <View style={themedStyles.featuredSpacer} />
                )}
                ListEmptyComponent={
                  <EmptyState message="No featured movies." />
                }
              />
            </View>

            <CategoryTabs
              tabs={CATEGORY_TABS}
              activeTab={activeCategory}
              onTabPress={setActiveCategory}
            />
          </>
        )}

        {searchQuery.trim() && (
          <View style={themedStyles.searchResultsHeader}>
            <Text style={themedStyles.searchResultsTitle}>
              Search Results ({filteredMovies.length})
            </Text>
          </View>
        )}

        <FlatList
          data={filteredMovies}
          keyExtractor={keyExtractor}
          renderItem={renderGridMovie}
          numColumns={3}
          scrollEnabled={false}
          columnWrapperStyle={globalStyles.gridColumn}
          contentContainerStyle={[
            globalStyles.gridContent,
            !filteredMovies.length && globalStyles.emptyGridContainer,
          ]}
          ListEmptyComponent={
            <EmptyState
              message={
                searchQuery.trim()
                  ? 'No movies found.'
                  : 'No movies available.'
              }
            />
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    header: {
      backgroundColor: colors.background,
      paddingTop: SPACING.lg,
      paddingBottom: SPACING.lg,
      paddingHorizontal: SPACING.lg,
      marginBottom: SPACING.xl,
      zIndex: 10,
    },
    headingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: SPACING.lg,
    },
    heading: {
      fontSize: FONT_SIZES.xxl,
      color: colors.text,
      fontWeight: '700',
      flex: 1,
      marginRight: SPACING.lg,
    },
    themeToggle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
    },
    featuredSection: {
      marginBottom: SPACING.xl,
      paddingBottom: SPACING.lg,
    },
    featuredContent: {
      paddingHorizontal: SPACING.lg,
    },
    featuredSpacer: {
      width: SPACING.lg,
    },
    searchResultsHeader: {
      marginBottom: SPACING.md,
    },
    searchResultsTitle: {
      fontSize: FONT_SIZES.lg,
      color: colors.text,
      fontWeight: '600',
    },
  });

export default HomeScreen;
