import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import type { Doc, Id } from '@/convex/_generated/dataModel';
import { useTheme } from '@/context/ThemeContext';

import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Doc<'todos'>[];
  onToggle: (id: Id<'todos'>) => void;
  onDelete: (id: Id<'todos'>) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const { colors } = useTheme();

  if (todos.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Ionicons name="checkmark-done-circle-outline" size={54} color={colors.success} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Усе виконано</Text>
        <Text style={[styles.emptyText, { color: colors.muted }]}>Додайте нове завдання</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TodoItem todo={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 10,
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 15,
    marginTop: 5,
  },
});
