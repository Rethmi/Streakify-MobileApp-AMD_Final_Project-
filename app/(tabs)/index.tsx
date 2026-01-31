// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   RefreshControl,
//   ScrollView,
// } from 'react-native';
// import { useAuth } from '@/context/AuthContext';
// import { HabitService } from '@/service/habitService';
// import HabitCard from '@/components/HabitCard';
// import StatsCard from '@/components/StatsCard';
// import { Habit } from '@/types/habit';
// import { TrendingUp, Target, Flame, Plus } from 'lucide-react-native';
// import { router } from 'expo-router';
 
// export default function HomeScreen() {
//   const { user } = useAuth();
//   const [habits, setHabits] = useState<Habit[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

//   const handleToggleHabit = async (habitId: string, completed: boolean) => {
//     try {
//       const today = HabitService.getTodayString();
//       await HabitService.toggleHabitCompletion(habitId, today, completed);

//       setHabits(prevHabits =>
//         prevHabits.map(habit =>
//           habit.id === habitId
//             ? { ...habit, completions: { ...habit.completions, [today]: completed } }
//             : habit
//         )
//       );
//     } catch (error) {
//       console.error('Error toggling habit:', error);
//       Alert.alert('Error', 'Failed to update habit');
//     }
//   };

//   useEffect(() => {
//   if (!user) return;

//   setLoading(true);
//   const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
//     setHabits(userHabits);
//     setLoading(false);
//   });

//   return () => unsubscribe(); 
// }, [user]);

//   const handleDeleteHabit = async (habitId: string) => {
//     Alert.alert(
//       'Delete Habit',
//       'Are you sure you want to delete this habit?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await HabitService.deleteHabit(habitId);
//               setHabits(prevHabits => prevHabits.filter(habit => habit.id !== habitId));
//               Alert.alert('Success', 'Habit deleted successfully');
//             } catch (error) {
//               Alert.alert('Error', 'Failed to delete habit');
//             }
//           },
//         },
//       ]
//     );
//   };

//   const loadHabits = async () => {
//     if (!user) return;
//     try {
//       const userHabits = await HabitService.getUserHabits(user.uid);
//       setHabits(userHabits);
//     } catch (error) {
//       console.error('Error loading habits:', error);
//       Alert.alert('Error', 'Failed to load habits');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateHabit = async (updatedHabit: Habit) => {
//     try {
//       await HabitService.updateHabit(updatedHabit.id, updatedHabit);
//       setHabits(prev =>
//         prev.map(habit => (habit.id === updatedHabit.id ? updatedHabit : habit))
//       );
//       setModalVisible(false);
//     } catch (error) {
//       console.error('Error updating habit:', error);
//       Alert.alert('Error', 'Failed to update habit');
//     }
//   };

//   const handleEditHabit = (habit: Habit) => {
//     setSelectedHabit(habit);
//     setModalVisible(true);
//   };

//   useEffect(() => {
//     loadHabits();
//   }, [user]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadHabits();
//     setRefreshing(false);
//   };

//   const today = HabitService.getTodayString();
//   const todaysHabits = habits.filter(habit => HabitService.isHabitActiveToday(habit));
//   const completedCount = todaysHabits.filter(habit => habit.completions[today]).length;
//   const completionRate =
//     todaysHabits.length > 0 ? Math.round((completedCount / todaysHabits.length) * 100) : 0;

//   const streak = HabitService.calculateStreak(habits);

//   const weeklyStats = HabitService.getWeeklyStats(habits);

//   const stats = [
//     {
//       title: "Today's Progress",
//       value: `${completedCount}/${todaysHabits.length}`,
//       percentage: completionRate,
//       icon: Target,
//       color: '#3B82F6',
//     },
//     {
//       title: 'Current Streak',
//       value: `${streak} days`,
//       percentage: streak > 0 ? Math.min(streak * 10, 100) : 0,
//       icon: Flame,
//       color: '#F59E0B',
//     },
//     {
//       title: 'Weekly Average',
//       value: `${weeklyStats.average}%`,
//       percentage: weeklyStats.average,
//       icon: TrendingUp,
//       color: '#10B981',
//     },
//   ];

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning! 🌅';
//     if (hour < 17) return 'Good afternoon! ☀️';
//     return 'Good evening! 🌙';
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading your habits...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View>
//             <Text style={styles.greeting}>{getGreeting()}</Text>
//             <Text style={styles.date}>
//               {new Date().toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </Text>
//           </View>
//           <TouchableOpacity style={styles.addButton} onPress={() => router.push('/(tabs)/add')}>
//             <Plus size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//        <View style={styles.statsSection}>
//         <Text style={styles.sectionTitle}>📊 Your Progress</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
//           {stats.map((stat, index) => (
//             <StatsCard key={index} {...stat} />
//           ))}
//         </ScrollView>
//       </View>

// <View style={styles.habitsSection}>
//         <Text style={styles.sectionTitle}>
//           🎯 Today's Habits ({completedCount}/{todaysHabits.length})
//         </Text>
//         {todaysHabits.length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyEmoji}>🎯</Text>
//             <Text style={styles.emptyTitle}>No habits for today</Text>
//             <Text style={styles.emptySubtitle}>
//               {habits.length === 0
//                 ? 'Start building healthy habits by adding your first one!'
//                 : 'All your habits are scheduled for other days. Great job staying organized!'}
//             </Text>
//             <TouchableOpacity
//               style={styles.emptyButton}
//               onPress={() => router.push('/(tabs)/add')}
//             >
//               <Plus size={20} color="#FFFFFF" />
//               <Text style={styles.emptyButtonText}>
//                 {habits.length === 0 ? 'Add Your First Habit' : 'Add Another Habit'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <FlatList
//             data={todaysHabits}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <HabitCard
//                 habit={item}
//                 onToggle={(completed) => handleToggleHabit(item.id, completed)}
//                 onDelete={() => handleDeleteHabit(item.id)}
//                 onEdit={() => handleEditHabit(item)}
//                 isCompleted={item.completions[today] || false}
//               />
//             )}
//             scrollEnabled={false}
//             contentContainerStyle={styles.habitsList}
//           />
//         )}
//       </View>

//       {habits.length > todaysHabits.length && (
//         <View style={styles.allHabitsSection}>
//           <Text style={styles.sectionTitle}>📅 All Your Habits</Text>
//           <FlatList
//             data={habits}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <HabitCard
//                 habit={item}
//                 onToggle={(completed) => handleToggleHabit(item.id, completed)}
//                 onDelete={() => handleDeleteHabit(item.id)}
//                 onEdit={() => handleEditHabit(item)}
//                 isCompleted={item.completions[today] || false}
//                 showFrequency={true}
//               />
//             )}
//             scrollEnabled={false}
//             contentContainerStyle={styles.habitsList}
//           />
//         </View>
//       )}

     
 

//       {habits.length > todaysHabits.length && (
//         <View style={styles.allHabitsSection}>
//           <Text style={styles.sectionTitle}>📅 All Your Habits</Text>
          
//         </View>
//       )}

       
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8FAFC' },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
//   loadingText: { fontSize: 16, color: '#64748B' },
//   header: {
//     paddingHorizontal: 24,
//     paddingTop: 60,
//     paddingBottom: 24,
//     backgroundColor: '#FFFFFF',
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   greeting: { fontSize: 28, fontWeight: 'bold', color: '#1E293B' },
//   date: { fontSize: 16, color: '#64748B', marginTop: 4 },
//   addButton: {
//     width: 48, height: 48, borderRadius: 24, backgroundColor: '#3B82F6',
//     alignItems: 'center', justifyContent: 'center', shadowColor: '#3B82F6',
//     shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
//   },
//   statsSection: { paddingHorizontal: 24, paddingVertical: 24 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 },
//   statsScroll: { marginHorizontal: -24, paddingHorizontal: 24 },
//   habitsSection: { paddingHorizontal: 24, paddingBottom: 24 },
//   allHabitsSection: {
//     paddingHorizontal: 24, paddingBottom: 24,
//     borderTopWidth: 1, borderTopColor: '#E2E8F0',
//     marginTop: 12, paddingTop: 24,
//   },
//   habitsList: { gap: 12 },
//   emptyContainer: {
//     alignItems: 'center', paddingVertical: 48, backgroundColor: '#FFFFFF',
//     borderRadius: 16, marginVertical: 8,
//   },
//   emptyEmoji: { fontSize: 48, marginBottom: 16 },
//   emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
//   emptySubtitle: {
//     fontSize: 16, color: '#64748B', textAlign: 'center',
//     marginBottom: 24, paddingHorizontal: 32, lineHeight: 22,
//   },
//   emptyButton: {
//     flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#3B82F6',
//     paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12,
//     shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
//   },
//   emptyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
// });



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   RefreshControl,
//   ScrollView,
//   StatusBar,
//   ActivityIndicator,
// } from 'react-native';
// import { useAuth } from '@/context/AuthContext';
// import { HabitService } from '@/service/habitService';
// import HabitCard from '@/components/HabitCard';
// import StatsCard from '@/components/StatsCard';
// import { Habit } from '@/types/habit';
// import { TrendingUp, Target, Flame, Plus, Calendar } from 'lucide-react-native';
// import { router } from 'expo-router';

// export default function HomeScreen() {
//   const { user } = useAuth();
//   const [habits, setHabits] = useState<Habit[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

//   // Stats calculation logic
//   const today = HabitService.getTodayString();
//   const todaysHabits = habits.filter(habit => HabitService.isHabitActiveToday(habit));
//   const completedCount = todaysHabits.filter(habit => habit.completions[today]).length;
//   const completionRate = todaysHabits.length > 0 ? Math.round((completedCount / todaysHabits.length) * 100) : 0;
//   const streak = HabitService.calculateStreak(habits);
//   const weeklyStats = HabitService.getWeeklyStats(habits);

//   const stats = [
//     {
//       title: "Today's Goal",
//       value: `${completedCount}/${todaysHabits.length}`,
//       percentage: completionRate,
//       icon: Target,
//       color: '#3B82F6',
//     },
//     {
//       title: 'Current Streak',
//       value: `${streak} Days`,
//       percentage: Math.min(streak * 10, 100),
//       icon: Flame,
//       color: '#EF4444',
//     },
//     {
//       title: 'Weekly Avg',
//       value: `${weeklyStats.average}%`,
//       percentage: weeklyStats.average,
//       icon: TrendingUp,
//       color: '#10B981',
//     },
//   ];

//   useEffect(() => {
//     if (!user) return;
//     const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
//       setHabits(userHabits);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [user]);

//   const handleToggleHabit = async (habitId: string, completed: boolean) => {
//     try {
//       await HabitService.toggleHabitCompletion(habitId, today, completed);
//     } catch (error) {
//       Alert.alert('Update Failed', 'Could not sync with cloud.');
//     }
//   };

//   const handleDeleteHabit = async (habitId: string) => {
//     Alert.alert('Delete Habit', 'This action cannot be undone.', [
//       { text: 'Keep It', style: 'cancel' },
//       { text: 'Delete', style: 'destructive', onPress: () => HabitService.deleteHabit(habitId) },
//     ]);
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     if (user) await HabitService.getUserHabits(user.uid);
//     setRefreshing(false);
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#3B82F6" />
//         <Text style={styles.loadingText}>Syncing your routine...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
      
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" />}
//       >
//         {/* Header Section */}
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.greeting}>{getGreeting()}, {user?.displayName?.split(' ')[0] || 'Achiever'}</Text>
//             <Text style={styles.date}>
//               {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
//             </Text>
//           </View>
//           <TouchableOpacity 
//             style={styles.addButton} 
//             onPress={() => router.push('/(tabs)/add')}
//             activeOpacity={0.8}
//           >
//             <Plus size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>

//         {/* Stats Section */}
//         <View style={styles.statsSection}>
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
//             {stats.map((stat, index) => (
//               <StatsCard key={index} {...stat} />
//             ))}
//           </ScrollView>
//         </View>

//         {/* Today's Habits */}
//         <View style={styles.habitsSection}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Today's Focus</Text>
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{completedCount}/{todaysHabits.length}</Text>
//             </View>
//           </View>

//           {todaysHabits.length === 0 ? (
//             <View style={styles.emptyContainer}>
//               <Calendar size={48} color="#334155" />
//               <Text style={styles.emptyTitle}>Clear Schedule</Text>
//               <Text style={styles.emptySubtitle}>No habits planned for today. Ready to add a new one?</Text>
//               <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/(tabs)/add')}>
//                 <Text style={styles.emptyButtonText}>Get Started</Text>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <View style={styles.listContainer}>
//               {todaysHabits.map((item) => (
//                 <HabitCard
//                   key={item.id}
//                   habit={item}
//                   onToggle={(completed) => handleToggleHabit(item.id, completed)}
//                   onDelete={() => handleDeleteHabit(item.id)}
//                   onEdit={() => router.push({ pathname: '/(tabs)/add', params: { id: item.id } })}
//                   isCompleted={item.completions[today] || false}
//                 />
//               ))}
//             </View>
//           )}
//         </View>

//         {/* Other Habits (Secondary Focus) */}
//         {habits.length > todaysHabits.length && (
//           <View style={[styles.habitsSection, { marginTop: 10 }]}>
//             <Text style={styles.sectionTitleSecondary}>Other Routines</Text>
//             <View style={styles.listContainer}>
//               {habits
//                 .filter(h => !HabitService.isHabitActiveToday(h))
//                 .map((item) => (
//                   <HabitCard
//                     key={item.id}
//                     habit={item}
//                     onToggle={() => {}} 
//                     onDelete={() => handleDeleteHabit(item.id)}
//                     onEdit={() => {}}
//                     isCompleted={false}
//                     showFrequency={true}
//                   />
//                 ))}
//             </View>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0F172A' }, // Matches Add Habit Screen
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' },
//   loadingText: { fontSize: 14, color: '#94A3B8', marginTop: 12 },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   greeting: { fontSize: 24, fontWeight: '800', color: '#F8FAFC' },
//   date: { fontSize: 14, color: '#64748B', marginTop: 2 },
//   addButton: {
//     width: 48, height: 48, borderRadius: 16, backgroundColor: '#3B82F6',
//     alignItems: 'center', justifyContent: 'center', elevation: 4,
//   },
//   statsSection: { marginBottom: 24 },
//   statsScroll: { paddingLeft: 24, paddingRight: 8, gap: 12 },
//   habitsSection: { paddingHorizontal: 24, paddingBottom: 20 },
//   sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
//   sectionTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC' },
//   sectionTitleSecondary: { fontSize: 16, fontWeight: '700', color: '#64748B', marginBottom: 16 },
//   badge: { backgroundColor: '#1E293B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
//   badgeText: { color: '#3B82F6', fontSize: 12, fontWeight: '800' },
//   listContainer: { gap: 12 },
//   emptyContainer: {
//     alignItems: 'center', justifyContent: 'center', padding: 40,
//     backgroundColor: '#1E293B', borderRadius: 24, borderWidth: 1, borderColor: '#334155',
//   },
//   emptyTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC', marginTop: 16 },
//   emptySubtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 8, lineHeight: 20 },
//   emptyButton: { marginTop: 20, backgroundColor: '#3B82F615', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#3B82F6' },
//   emptyButtonText: { color: '#3B82F6', fontWeight: '700' },
// });



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { HabitService } from '@/service/habitService';
import HabitCard from '@/components/HabitCard';
import StatsCard from '@/components/StatsCard';
import { Habit } from '@/types/habit';
import { 
  TrendingUp, 
  Target, 
  Flame, 
  Plus, 
  Calendar, 
  BarChart2, 
  X,
  Award
} from 'lucide-react-native';
import { router } from 'expo-router';
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Basic Logic
  const today = HabitService.getTodayString();
  const todaysHabits = habits.filter(habit => HabitService.isHabitActiveToday(habit));
  const completedCount = todaysHabits.filter(habit => habit.completions[today]).length;
  const completionRate = todaysHabits.length > 0 ? Math.round((completedCount / todaysHabits.length) * 100) : 0;
  const streak = HabitService.calculateStreak(habits);
  const weeklyStats = HabitService.getWeeklyStats(habits);

  const stats = [
    {
      title: "Today's Goal",
      value: `${completedCount}/${todaysHabits.length}`,
      percentage: completionRate,
      icon: Target,
      color: '#3B82F6',
    },
    {
      title: 'Current Streak',
      value: `${streak} Days`,
      percentage: Math.min(streak * 10, 100),
      icon: Flame,
      color: '#EF4444',
    },
    {
      title: 'Weekly Avg',
      value: `${weeklyStats.average}%`,
      percentage: weeklyStats.average,
      icon: TrendingUp,
      color: '#10B981',
    },
  ];

  useEffect(() => {
    if (!user) return;
    const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
      setHabits(userHabits);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleToggleHabit = async (habitId: string, completed: boolean) => {
    try {
      await HabitService.toggleHabitCompletion(habitId, today, completed);
    } catch (error) {
      Alert.alert('Update Failed', 'Could not sync with cloud.');
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    Alert.alert('Delete Habit', 'This action cannot be undone.', [
      { text: 'Keep It', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => HabitService.deleteHabit(habitId) },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) await HabitService.getUserHabits(user.uid);
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Chart Configuration  
const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [{
    // මෙතනදී ?? operator එක පාවිච්චි කරලා null/undefined නම් [0,0...] දෙන්න
    data: (weeklyStats?.dailyBreakdown && weeklyStats.dailyBreakdown.length === 7) 
          ? weeklyStats.dailyBreakdown 
          : [0, 0, 0, 0, 0, 0, 0], 
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    strokeWidth: 3
  }]
};

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Syncing your routine...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3B82F6" />}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, {user?.displayName?.split(' ')[0] || 'Rethmi'}</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.analyticsButton} 
              onPress={() => setShowAnalytics(true)}
              activeOpacity={0.7}
            >
              <BarChart2 size={22} color="#3B82F6" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => router.push('/(tabs)/add')}
              activeOpacity={0.8}
            >
              <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </ScrollView>
        </View>

        {/* Today's Habits */}
        <View style={styles.habitsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Focus</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{completedCount}/{todaysHabits.length}</Text>
            </View>
          </View>

          {todaysHabits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Calendar size={48} color="#334155" />
              <Text style={styles.emptyTitle}>Clear Schedule</Text>
              <Text style={styles.emptySubtitle}>No habits planned for today. Ready to add a new one?</Text>
              <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/(tabs)/add')}>
                <Text style={styles.emptyButtonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {todaysHabits.map((item) => (
                // <HabitCard
                //   key={item.id}
                //   habit={item}
                //   onToggle={(completed) => handleToggleHabit(item.id, completed)}
                //   onDelete={() => handleDeleteHabit(item.id)}
                //  onEdit={() => router.push(`/edit-habit/${item.id}`)} // මෙන්න මේ line එක හරියට තියෙන්න ඕනේ
                //   isCompleted={item.completions[today] || false}
                // />
                <HabitCard
  key={item.id}
  habit={item}
  onToggle={(completed) => handleToggleHabit(item.id, completed)}
  onDelete={() => handleDeleteHabit(item.id)}
  // මෙන්න මෙතන path එක සහ query parameter එක හරියටම දෙන්න
  onEdit={() => router.push({
    pathname: '/edit-habit',
    params: { id: item.id }
  })} 
  isCompleted={item.completions[today] || false}
/>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Analytics Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAnalytics}
        onRequestClose={() => setShowAnalytics(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Performance</Text>
                <Text style={styles.modalSubtitle}>Your weekly activity</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setShowAnalytics(false)}>
                <X size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <LineChart
              data={chartData}
              width={screenWidth * 0.85}
              height={200}
              chartConfig={{
                backgroundColor: "#1E293B",
                backgroundGradientFrom: "#1E293B",
                backgroundGradientTo: "#1E293B",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
                propsForDots: { r: "5", strokeWidth: "2", stroke: "#3B82F6" },
                propsForBackgroundLines: { stroke: "#334155" }
              }}
              bezier
              style={styles.chartStyle}
            />

            <View style={styles.analysisRow}>
              <View style={styles.analysisBox}>
                <Award size={20} color="#10B981" style={{marginBottom: 4}} />
                <Text style={styles.analysisLabel}>Success Rate</Text>
                <Text style={styles.analysisValue}>{weeklyStats.average}%</Text>
              </View>
              <View style={styles.analysisBox}>
                <Flame size={20} color="#EF4444" style={{marginBottom: 4}} />
                <Text style={styles.analysisLabel}>Best Streak</Text>
                <Text style={styles.analysisValue}>{streak} Days</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.doneButton} 
              onPress={() => setShowAnalytics(false)}
            >
              <Text style={styles.doneButtonText}>Close Dashboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' },
  loadingText: { fontSize: 14, color: '#94A3B8', marginTop: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerButtons: { flexDirection: 'row', gap: 12 },
  greeting: { fontSize: 24, fontWeight: '800', color: '#F8FAFC' },
  date: { fontSize: 14, color: '#64748B', marginTop: 2 },
  addButton: {
    width: 48, height: 48, borderRadius: 16, backgroundColor: '#3B82F6',
    alignItems: 'center', justifyContent: 'center', elevation: 4,
  },
  analyticsButton: {
    width: 48, height: 48, borderRadius: 16, backgroundColor: '#1E293B',
    alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155',
  },
  statsSection: { marginBottom: 24 },
  statsScroll: { paddingLeft: 24, paddingRight: 8, gap: 12 },
  habitsSection: { paddingHorizontal: 24, paddingBottom: 20 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC' },
  badge: { backgroundColor: '#1E293B', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: '#334155' },
  badgeText: { color: '#3B82F6', fontSize: 12, fontWeight: '800' },
  listContainer: { gap: 12 },
  emptyContainer: {
    alignItems: 'center', justifyContent: 'center', padding: 40,
    backgroundColor: '#1E293B', borderRadius: 24, borderWidth: 1, borderColor: '#334155',
  },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC', marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  emptyButton: { marginTop: 20, backgroundColor: '#3B82F615', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#3B82F6' },
  emptyButtonText: { color: '#3B82F6', fontWeight: '700' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 23, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    backgroundColor: '#1E293B',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalTitle: { fontSize: 22, fontWeight: '800', color: '#F8FAFC' },
  modalSubtitle: { fontSize: 14, color: '#94A3B8', marginTop: 2 },
  closeButton: {
    backgroundColor: '#334155',
    padding: 8,
    borderRadius: 12,
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    paddingRight: 40,
  },
  analysisRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  analysisBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  analysisLabel: { color: '#64748B', fontSize: 11, fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  analysisValue: { color: '#F8FAFC', fontSize: 18, fontWeight: '700' },
  doneButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  doneButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});