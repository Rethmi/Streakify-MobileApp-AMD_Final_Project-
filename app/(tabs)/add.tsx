import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { HabitService } from '@/service/habitService';
import { Plus, Shield, Clock, RotateCcw, Layout, AlignLeft } from 'lucide-react-native';
import { 
  BookOpen, Dumbbell, Droplets, Moon, Wind, Timer, 
  Apple, GraduationCap, Music, Briefcase, Heart, 
  Coffee, Code, Camera, Brush, Wallet, CheckCircle2,
  Users, Cloud, Sun
} from 'lucide-react-native';
import { HabitFrequency } from '@/types/habit';


const HABIT_ICONS = [
 // Health & Fitness
  { key: 'exercise', icon: Dumbbell, label: 'Fitness', color: '#FF4757' },
  { key: 'running', icon: Timer, label: 'Running', color: '#FFA502' },
  { key: 'water', icon: Droplets, label: 'Hydrate', color: '#2E86DE' },
  { key: 'healthy-food', icon: Apple, label: 'Nutrition', color: '#2ED573' },
  
  // Mind & Spirit
  { key: 'meditation', icon: Wind, label: 'Zen', color: '#1PR7BE' },
  { key: 'sleep', icon: Moon, label: 'Sleep', color: '#5F27CD' },
  { key: 'mental-health', icon: Heart, label: 'Self-Care', color: '#FF6B6B' },
  { key: 'morning', icon: Sun, label: 'Morning', color: '#ECCC68' },

  // Productivity & Work
  { key: 'work', icon: Briefcase, label: 'Career', color: '#576574' },
  { key: 'study', icon: GraduationCap, label: 'Learning', color: '#10AC84' },
  { key: 'reading', icon: BookOpen, label: 'Reading', color: '#54A0FF' },
  { key: 'coding', icon: Code, label: 'Coding', color: '#341F97' },

  // Lifestyle & Creativity
  { key: 'music', icon: Music, label: 'Music', color: '#FF9FF3' },
  { key: 'creative', icon: Brush, label: 'Art', color: '#FECA57' },
  { key: 'finance', icon: Wallet, label: 'Finance', color: '#00D2D3' },
  { key: 'social', icon: Users, label: 'Social', color: '#48DBFB' },
];

const TIME_SLOTS = [
  { label: 'Morning', value: '06:00' },
  { label: 'Midday', value: '12:00' },
  { label: 'Evening', value: '18:00' },
  { label: 'Custom', value: 'custom' },
];

const FREQUENCY_OPTIONS: { key: HabitFrequency; label: string }[] = [
  { key: 'daily', label: 'Every Day' },
  { key: 'weekdays', label: 'Mon - Fri' },
  { key: 'weekends', label: 'Sat - Sun' },
  { key: 'weekly', label: 'Weekly' }, // මෙතන 'weekly' එකතු කිරීමට අමතක කරන්න එපා
];

export default function AddHabitScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTime, setSelectedTime] = useState('06:00');
  const [customTime, setCustomTime] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('reading');
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');
  const [loading, setLoading] = useState(false);

  const handleAddHabit = async () => {
    if (!title.trim()) {
      Alert.alert('Required Field', 'Please give your habit a name.');
      return;
    }

    if (!user?.uid) {
      Alert.alert('Session Expired', 'Please sign in again to continue.');
      return;
    }

    setLoading(true);
    try {
      const finalTime = selectedTime === 'custom' ? customTime : selectedTime;
      
      await HabitService.createHabit(
        { 
          title: title.trim(), 
          description: description.trim(), 
          time: finalTime || '06:00', 
          icon: selectedIcon, 
          frequency 
        },
        user.uid
      );

      Alert.alert('Success', 'Your new routine is set!');
      router.push('/(tabs)');
    } catch (error) {
      console.error(error);
      Alert.alert('Oops!', 'Something went wrong while saving.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Shield size={32} color="#3B82F6" />
          </View>
          <Text style={styles.headerTitle}>Create New Habit</Text>
          <Text style={styles.headerSubtitle}>Small steps lead to big changes.</Text>
        </View>

        <View style={styles.form}>
          {/* Section: Basic Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlignLeft size={16} color="#3B82F6" />
              <Text style={styles.label}>HABIT DETAILS</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="e.g. Morning Yoga"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#475569"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Why is this important to you? (Optional)"
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor="#475569"
            />
          </View>

          {/* Section: Icon Selection */}
        <View style={styles.section}>
  <View style={styles.sectionHeader}>
    <Layout size={16} color="#3B82F6" />
    <Text style={styles.label}>SELECT ACTIVITY TYPE</Text>
  </View>
  
  {/* Me ScrollView eka use karanna */}
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false} 
    contentContainerStyle={{ paddingRight: 20 }}
    style={styles.iconScroll}
  >
    {HABIT_ICONS.map((item) => {
      const IconComponent = item.icon;
      const isSelected = selectedIcon === item.key;
      
      return (
        <TouchableOpacity
          key={item.key}
          activeOpacity={0.7}
          onPress={() => setSelectedIcon(item.key)}
          style={[
            styles.iconBox,
            isSelected && { 
              borderColor: item.color,
              backgroundColor: `${item.color}10`, // Subtle color tint
            }
          ]}
        >
          {/* Subtle circle behind icon */}
          <View style={[
            styles.iconCircle, 
            { backgroundColor: isSelected ? 'transparent' : '#1E293B' }
          ]}>
            <IconComponent 
              size={24} 
              color={isSelected ? item.color : '#94A3B8'} 
              strokeWidth={isSelected ? 2.5 : 2} 
            />
          </View>
          <Text style={[
            styles.iconLabel, 
            isSelected && { color: item.color, fontWeight: '800' }
          ]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
</View>
          {/* Section: Schedule & Frequency */}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={styles.sectionHeader}>
                <Clock size={16} color="#3B82F6" />
                <Text style={styles.label}>TIME</Text>
              </View>
              <View style={styles.optionsGrid}>
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
              {selectedTime === 'custom' && (
                <TextInput
                  style={[styles.input, { marginTop: 10, paddingVertical: 8 }]}
                  placeholder="08:30 PM"
                  value={customTime}
                  onChangeText={setCustomTime}
                  placeholderTextColor="#475569"
                />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.sectionHeader}>
                <RotateCcw size={16} color="#3B82F6" />
                <Text style={styles.label}>RECURRENCE</Text>
              </View>
              <View style={styles.optionsGrid}>
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
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleAddHabit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.submitButtonText}>ACTIVATE HABIT</Text>
            )}
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