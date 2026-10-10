import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from 'convex/react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '@/convex/_generated/api';
import { useTheme } from '@/context/ThemeContext';

export default function StatsScreen() {
  const { colors } = useTheme();
  const stats = useQuery(api.todos.getStats);

  if (!stats) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.muted }]}>Синхронізація з Convex...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const cards = [
    { title: 'Всього завдань', value: stats.total, icon: 'list', color: colors.primary },
    { title: 'Активні', value: stats.active, icon: 'time', color: '#F59E0B' },
    { title: 'Виконані', value: stats.completed, icon: 'checkmark-circle', color: colors.success },
    { title: 'Прогрес', value: `${stats.percentage}%`, icon: 'trending-up', color: '#0EA5E9' },
  ] as const;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Статистика</Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>Ваш прогрес у виконанні завдань</Text>
        <View style={styles.grid}>
          {cards.map((card) => (
            <View
              key={card.title}
              style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <View style={[styles.iconBox, { backgroundColor: `${card.color}20` }]}>
                <Ionicons name={card.icon} size={28} color={card.color} />
              </View>
              <Text style={[styles.value, { color: colors.text }]}>{card.value}</Text>
              <Text style={[styles.cardTitle, { color: colors.muted }]}>{card.title}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.progressCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { color: colors.text }]}>Загальний прогрес</Text>
            <Text style={[styles.progressValue, { color: colors.primary }]}>{stats.percentage}%</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.surfaceAlt }]}>
            <View style={[styles.progressFill, { width: `${stats.percentage}%`, backgroundColor: colors.primary }]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 12,
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 6,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    marginBottom: 14,
  },
  value: {
    fontSize: 30,
    fontWeight: '800',
  },
  cardTitle: {
    fontSize: 14,
    marginTop: 4,
  },
  progressCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginTop: 18,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  progressTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  progressValue: {
    fontSize: 17,
    fontWeight: '800',
  },
  progressTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 12,
    borderRadius: 6,
  },
});
