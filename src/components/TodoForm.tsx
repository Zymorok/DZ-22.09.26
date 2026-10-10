import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

interface TodoFormProps {
  onAdd: (text: string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const { colors } = useTheme();
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    const value = text.trim();

    if (!value || saving) {
      return;
    }

    try {
      setSaving(true);
      await onAdd(value);
      setText('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Не вдалося додати завдання:', error);
      Alert.alert('Помилка', 'Не вдалося додати завдання');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, backgroundColor: colors.surfaceAlt, borderColor: colors.border },
        ]}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        placeholder="Нове завдання"
        placeholderTextColor={colors.muted}
        maxLength={120}
        returnKeyType="done"
        editable={!saving}
      />
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleAdd}
        disabled={!text.trim() || saving}
        accessibilityRole="button"
        accessibilityLabel="Додати завдання"
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 14,
    fontSize: 16,
  },
  button: {
    width: 50,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    marginLeft: 10,
  },
});
