import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Alert, ScrollView, KeyboardAvoidingView, Platform, 
  ActivityIndicator, StatusBar
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { HabitService } from '@/service/habitService';
import { Shield, Clock, RotateCcw, AlignLeft, Layout, ChevronLeft } from 'lucide-react-native';
import { 
  Dumbbell, Timer, Droplets, Apple, Wind, Moon, Heart, Sun,
  Briefcase, GraduationCap, BookOpen, Code, Music, Brush, Wallet, Users
} from 'lucide-react-native';

const HABIT_ICONS = [
  { key: 'exercise', icon: Dumbbell, label: 'Fitness', color: '#FF4757' },
  { key: 'running', icon: Timer, label: 'Running', color: '#FFA502' },
  { key: 'water', icon: Droplets, label: 'Hydrate', color: '#2E86DE' },
  { key: 'healthy-food', icon: Apple, label: 'Nutrition', color: '#2ED573' },
  { key: 'meditation', icon: Wind, label: 'Zen', color: '#00D2D3' },
  { key: 'sleep', icon: Moon, label: 'Sleep', color: '#5F27CD' },
  { key: 'reading', icon: BookOpen, label: 'Reading', color: '#54A0FF' },
  { key: 'coding', icon: Code, label: 'Coding', color: '#341F97' },
];

const TIME_SLOTS = [
  { label: 'Morning', value: '06:00' },
  { label: 'Midday', value: '12:00' },
  { label: 'Evening', value: '18:00' },
  { label: 'Custom', value: 'custom' },
];

const FREQUENCY_OPTIONS = [
  { key: 'daily', label: 'Every Day' },
  { key: 'weekdays', label: 'Mon - Fri' },
  { key: 'weekends', label: 'Sat - Sun' },
];

export default function EditHabitScreen() {
  const { id } = useLocalSearchParams(); // URL එකෙන් Habit ID එක ලබා ගැනීම
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState('06:00');
  const [customTime, setCustomTime] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('reading');
  const [frequency, setFrequency] = useState('daily');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // පවතින Data Fetch කිරීම
  useEffect(() => {
    const loadHabit = async () => {
      try {
        const habit = await HabitService.getHabit(id as string);
        if (habit) {
          setTitle(habit.title);
          setDescription(habit.description || '');
          setSelectedIcon(habit.icon);
          setFrequency(habit.frequency);
          
          const isPresetTime = TIME_SLOTS.find(s => s.value === habit.time);
          if (isPresetTime) {
            setSelectedTime(habit.time);
          } else {
            setSelectedTime('custom');
            setCustomTime(habit.time);
          }
        }
      } catch (error) {
        Alert.alert('Error', 'Could not load habit data.');
      } finally {
        setFetching(false);
      }
    };
    loadHabit();
  }, [id]);

  const handleUpdate = async () => {
    if (!title.trim()) return Alert.alert('Error', 'Name is required');

    setLoading(true);
    try {
      const finalTime = selectedTime === 'custom' ? customTime : selectedTime;
      await HabitService.updateHabit(id as string, {
        title: title.trim(),
        description: description.trim(),
        time: finalTime,
        icon: selectedIcon,
        frequency
      });
      Alert.alert('Success', 'Habit updated successfully!');
      router.back();
    } catch (error) {
      Alert.alert('Oops!', 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity> */}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Habit</Text>
          <Text style={styles.headerSubtitle}>Refine your routine.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlignLeft size={16} color="#3B82F6" />
              <Text style={styles.label}>HABIT DETAILS</Text>
            </View>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholderTextColor="#475569" />
            <TextInput 
                style={[styles.input, styles.textArea]} 
                value={description} 
                onChangeText={setDescription} 
                multiline 
                placeholderTextColor="#475569" 
            />
          </View>

          <View style={styles.section}>
             <View style={styles.sectionHeader}><Layout size={16} color="#3B82F6" /><Text style={styles.label}>ICON</Text></View>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.iconScroll}>
                {HABIT_ICONS.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <TouchableOpacity 
                      key={item.key} 
                      onPress={() => setSelectedIcon(item.key)}
                      style={[styles.iconBox, selectedIcon === item.key && { borderColor: item.color, backgroundColor: `${item.color}20` }]}
                    >
                      <IconComp size={24} color={selectedIcon === item.key ? item.color : '#94A3B8'} />
                    </TouchableOpacity>
                  );
                })}
             </ScrollView>
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>TIME</Text>
              {TIME_SLOTS.map((slot) => (
                <TouchableOpacity 
                  key={slot.value} 
                  style={[styles.optionChip, selectedTime === slot.value && styles.activeChip]}
                  onPress={() => setSelectedTime(slot.value)}
                >
                  <Text style={[styles.chipText, selectedTime === slot.value && styles.activeChipText]}>{slot.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>RECURRENCE</Text>
              {FREQUENCY_OPTIONS.map((opt) => (
                <TouchableOpacity 
                  key={opt.key} 
                  style={[styles.optionChip, frequency === opt.key && styles.activeChip]}
                  onPress={() => setFrequency(opt.key)}
                >
                  <Text style={[styles.chipText, frequency === opt.key && styles.activeChipText]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleUpdate} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.submitButtonText}>SAVE CHANGES</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Deep Navy
  },
  scrollContent: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  form: {
    gap: 28,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    color: '#F1F5F9',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  iconScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  iconBox: {
  width: 85,
  height: 100,
  borderRadius: 24,
  backgroundColor: '#1E293B',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
  borderWidth: 1.5,
  borderColor: '#334155',
  padding: 8,
},
iconCircle: {
  width: 48,
  height: 48,
  borderRadius: 16,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
},
iconLabel: {
  fontSize: 11,
  color: '#94A3B8',
  fontWeight: '600',
  textAlign: 'center',
},
  activeIconBox: {
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  // iconLabel: {
  //   fontSize: 10,
  //   color: '#94A3B8',
  //   fontWeight: '600',
  // },
  activeLabel: {
    color: '#3B82F6',
  },
  row: {
    flexDirection: 'row',
    gap: 20,
  },
  optionsGrid: {
    gap: 8,
  },
  optionChip: {
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  activeChip: {
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
  },
  activeChipText: {
    color: '#3B82F6',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
});