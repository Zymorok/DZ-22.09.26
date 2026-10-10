import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Doc, Id } from '@/convex/_generated/dataModel';
import { useTheme } from '@/context/ThemeContext';

interface TodoItemProps {
  todo: Doc<'todos'>;
  onToggle: (id: Id<'todos'>) => void;
  onDelete: (id: Id<'todos'>) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surfaceAlt, borderColor: colors.border },
      ]}
    >
      <Pressable
        onPress={() => onToggle(todo._id)}
        accessibilityRole="checkbox"
        accessibilityLabel={`Змінити статус: ${todo.text}`}
        accessibilityState={{ checked: todo.isCompleted }}
      >
        <Ionicons
          name={todo.isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
          size={29}
          color={todo.isCompleted ? colors.success : colors.primary}
        />
      </Pressable>
      <Text
        style={[
          styles.text,
          { color: todo.isCompleted ? colors.muted : colors.text },
          todo.isCompleted && styles.completedText,
        ]}
      >
        {todo.text}
      </Text>
      <Pressable
        style={styles.deleteButton}
        onPress={() => onDelete(todo._id)}
        accessibilityRole="button"
        accessibilityLabel={`Видалити: ${todo.text}`}
      >
        <Ionicons name="trash-outline" size={22} color={colors.danger} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 60,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    marginHorizontal: 12,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
