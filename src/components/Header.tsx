import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  totalCount: number;
  completedCount: number;
}

export function Header({ totalCount, completedCount }: HeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Ionicons name="clipboard" size={30} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>Мої завдання</Text>
      </View>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        {totalCount > 0 ? `Виконано ${completedCount} з ${totalCount}` : 'Список завдань порожній'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 7,
  },
});
