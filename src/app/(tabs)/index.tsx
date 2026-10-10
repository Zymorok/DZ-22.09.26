import { useMutation, useQuery } from 'convex/react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { TodoForm } from '@/components/TodoForm';
import { TodoList } from '@/components/TodoList';
import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useTheme } from '@/context/ThemeContext';

export default function TasksScreen() {
  const { colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const createTodo = useMutation(api.todos.createTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const completedCount = todos?.filter((todo) => todo.isCompleted).length ?? 0;

  const handleToggle = (id: Id<'todos'>) => {
    toggleTodo({ id }).catch((error) => console.error('Не вдалося змінити завдання:', error));
  };

  const handleDelete = (id: Id<'todos'>) => {
    deleteTodo({ id }).catch((error) => console.error('Не вдалося видалити завдання:', error));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Header totalCount={todos?.length ?? 0} completedCount={completedCount} />
          <TodoForm onAdd={async (text) => void (await createTodo({ text }))} />
          {todos ? (
            <View style={styles.listBox}>
              <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
            </View>
          ) : (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
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
    alignItems: 'center',
    padding: 14,
  },
  card: {
    flex: 1,
    width: '100%',
    maxWidth: 620,
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  listBox: {
    flex: 1,
  },
  loadingBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
