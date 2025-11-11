import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../constants/spacing';
import { getAllMovies } from '../api/movieApi';
import { getMovieIdentifier, searchMovies } from '../utils/helpers';
import LoadingScreen from '../components/common/LoadingScreen';
import EmptyState from '../components/common/EmptyState';
import ScreenHeader from '../components/common/ScreenHeader';
import SearchBar from '../components/common/SearchBar';
import FavoriteMovieCard from '../components/movie/FavoriteMovieCard';
import { globalStyles } from '../styles/globalStyles';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all movies once, then filter locally for better performance
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getAllMovies();
        setAllMovies(Array.isArray(data) ? data : []);
      } catch (error) {
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const trimmedQuery = searchQuery.trim();
  const hasSearched = trimmedQuery.length > 0;

  // Filter movies locally by title, genre, description, or year
  const filteredMovies = useMemo(() => {
    if (!hasSearched) {
      return [];
    }

    return searchMovies(allMovies, trimmedQuery);
  }, [allMovies, trimmedQuery, hasSearched]);

  const handleMoviePress = useCallback(
    (movie) => {
      const identifier = getMovieIdentifier(movie);
      navigation.navigate('Details', { movieId: identifier, movie });
    },
    [navigation],
  );

  const keyExtractor = useCallback(
    (item, index) => String(getMovieIdentifier(item) ?? index),
    [],
  );

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <ScreenHeader
          title="Search"
          onAction={() => {}}
          actionIcon="information-circle-outline"
        />
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScreenHeader
        title="Search"
        onAction={() => {}}
        actionIcon="information-circle-outline"
      />

      <View style={styles.searchBarContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search movies..."
        />
      </View>

      <FlatList
        key="search-results"
        data={filteredMovies}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <FavoriteMovieCard
            movie={item}
            onPress={handleMoviePress}
            onLongPress={() => {}}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredMovies.length === 0 && styles.emptyStateContainer,
        ]}
        ListEmptyComponent={
          hasSearched ? (
            <EmptyState
              icon="search-outline"
              iconSize={64}
              message="We Are Sorry, We Can Not Find The Movie :("
              subtitle="Find your movie by Type title, categories, years, etc"
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
  },
  emptyStateContainer: {
    flexGrow: 1,
  },
});

export default SearchScreen;


