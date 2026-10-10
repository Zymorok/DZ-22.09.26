import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from 'convex/react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { api } from '@/convex/_generated/api';
import { useTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const stats = useQuery(api.todos.getStats);
  const clearCompleted = useMutation(api.todos.clearCompleted);
  const clearAll = useMutation(api.todos.clearAll);
  const completedCount = stats?.completed ?? 0;

  const confirmClearCompleted = () => {
    Alert.alert('Очистити виконані?', 'Виконані завдання буде видалено.', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Очистити',
        style: 'destructive',
        onPress: async () => {
          try {
            const result = await clearCompleted();
            Alert.alert('Готово', `Видалено завдань: ${result.deletedCount}`);
          } catch (error) {
            console.error('Не вдалося очистити виконані завдання:', error);
            Alert.alert('Помилка', 'Не вдалося очистити виконані завдання');
          }
        },
      },
    ]);
  };

  const confirmClearAll = () => {
    Alert.alert('Видалити всі завдання?', 'Цю дію не можна скасувати.', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: async () => {
          try {
            const result = await clearAll();
            Alert.alert('Готово', `Видалено завдань: ${result.deletedCount}`);
          } catch (error) {
            console.error('Не вдалося видалити всі завдання:', error);
            Alert.alert('Помилка', 'Не вдалося видалити всі завдання');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Налаштування</Text>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={25} color={colors.primary} />
          </View>
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {isDark ? 'Темна тема' : 'Світла тема'}
            </Text>
            <Text style={[styles.cardSubtitle, { color: colors.muted }]}>Змінити вигляд застосунку</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor="#FFFFFF"
            accessibilityLabel="Перемкнути тему"
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Дії із завданнями</Text>
        <Pressable
          style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={confirmClearCompleted}
          disabled={completedCount === 0}
          accessibilityRole="button"
          accessibilityLabel="Очистити виконані завдання"
        >
          <Ionicons name="checkmark-done" size={24} color={colors.success} />
          <Text style={[styles.actionText, { color: colors.text }]}>Очистити виконані</Text>
          <Text style={[styles.count, { color: colors.muted }]}>{completedCount}</Text>
        </Pressable>

        <Pressable
          style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={confirmClearAll}
          disabled={!stats?.total}
          accessibilityRole="button"
          accessibilityLabel="Видалити всі завдання"
        >
          <Ionicons name="trash" size={24} color={colors.danger} />
          <Text style={[styles.actionText, { color: colors.danger }]}>Видалити всі завдання</Text>
        </Pressable>

        <View style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="information-circle" size={28} color={colors.primary} />
          <View style={styles.cardText}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Мій список завдань</Text>
            <Text style={[styles.cardSubtitle, { color: colors.muted }]}>Версія 3.0.0 · Convex Cloud</Text>
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
    marginBottom: 22,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 14,
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginTop: 28,
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  count: {
    fontSize: 15,
    fontWeight: '700',
  },
  aboutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginTop: 26,
  },
});
