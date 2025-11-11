import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../constants/spacing';
import { useFavorites } from '../context/FavoritesContext';
import { getMovieIdentifier } from '../utils/helpers';
import LoadingScreen from '../components/common/LoadingScreen';
import EmptyState from '../components/common/EmptyState';
import ScreenHeader from '../components/common/ScreenHeader';
import FavoriteMovieCard from '../components/movie/FavoriteMovieCard';
import { createGlobalStyles } from '../styles/globalStyles';
import { useTheme } from '../context/ThemeContext';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favorites, loading, removeFavorite, loadFavorites } = useFavorites();
  const { colors } = useTheme();
  const globalStyles = useMemo(() => createGlobalStyles(colors), [colors]);
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadFavorites();
    } finally {
      setRefreshing(false);
    }
  }, [loadFavorites]);

  const handleMoviePress = useCallback(
    (movie) => {
      const identifier = getMovieIdentifier(movie);
      navigation.navigate('Details', { movieId: identifier, movie });
    },
    [navigation],
  );

  const handleLongPress = useCallback(
    (movie) => {
      const identifier = getMovieIdentifier(movie);
      const title = movie.title ?? movie.name ?? 'this movie';

      if (!identifier) {
        Alert.alert('Error', 'Cannot identify movie');
        return;
      }

      Alert.alert(
        'Remove from favorites',
        `Are you sure you want to remove "${title}" from your favorites?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => {
              removeFavorite(identifier)
                .then(() =>
                  Alert.alert('Success', 'Removed from favorites'),
                )
                .catch(() =>
                  Alert.alert(
                    'Error',
                    'Could not remove movie. Please try again.',
                  ),
                );
            },
          },
        ],
      );
    },
    [removeFavorite],
  );

  const keyExtractor = useCallback(
    (item, index) => String(getMovieIdentifier(item) ?? index),
    [],
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={globalStyles.safeArea}>
        <ScreenHeader title="Watch list" />
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScreenHeader title="Watch list" />
      <FlatList
        key="favorites-list"
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <FavoriteMovieCard
            movie={item}
            onPress={handleMoviePress}
            onLongPress={handleLongPress}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          favorites.length === 0 && styles.emptyStateContainer,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            progressViewOffset={SPACING.md}
          />
        }
        ListEmptyComponent={
          !loading ? (
            <EmptyState
              icon="bookmark-outline"
              iconSize={64}
              message="No favorites yet"
              subtitle="Start adding movies to your favorites to see them here"
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: SPACING.lg,
      paddingTop: SPACING.md,
      paddingBottom: SPACING.xxxl,
    },
    emptyStateContainer: {
      flexGrow: 1,
    },
  });

export default FavoritesScreen;


