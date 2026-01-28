// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   Alert,
// //   ScrollView,
// //   RefreshControl,
// // } from 'react-native';
// // import { useAuth } from '@/context/AuthContext';
// // import { HabitService } from '@/service/habitService';
// // import { Habit } from '@/types/habit';
// // import { router } from 'expo-router';
// // import { 
// //   User, 
// //   Mail, 
// //   LogOut, 
// //   Settings, 
// //   Calendar, 
// //   Target, 
// //   TrendingUp, 
// //   Award,
// //   Clock,
// //   Flame,
// //   BarChart3,
// //   Bell,
// //   Shield,
// //   HelpCircle,
// //   Star,
// //   ChevronRight
// // } from 'lucide-react-native';

// // export default function ProfileScreen() {
// //   const { user, logout } = useAuth();
// //   const [habits, setHabits] = useState<Habit[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

  
// //   useEffect(() => {
// //   if (!user) return;

// //   setLoading(true);

// //   const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
// //     setHabits(userHabits);
// //     setLoading(false);
// //   });

// //   return () => unsubscribe(); 
// // }, [user]);

// //   const loadUserData = async () => {
// //     if (!user) return;

// //     try {
// //       const userHabits = await HabitService.getUserHabits(user.uid);
// //       setHabits(userHabits);
// //     } catch (error) {
// //       console.error('Error loading user data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onRefresh = async () => {
// //     setRefreshing(true);
// //     await loadUserData();
// //     setRefreshing(false);
// //   };

// //   const handleLogout = () => {
// //     Alert.alert(
// //       'Sign Out',
// //       'Are you sure you want to sign out?',
// //       [
// //         {
// //           text: 'Cancel',
// //           style: 'cancel',
// //         },
// //         {
// //           text: 'Sign Out',
// //           style: 'destructive',
// //           onPress: async () => {
// //             try {
// //               await logout();
// //             } catch (error) {
// //               Alert.alert('Error', 'Failed to sign out');
// //             }
// //           },
// //         },
// //       ]
// //     );
// //   };

// //   const today = HabitService.getTodayString();
// //   const todaysHabits = habits.filter(habit => HabitService.isHabitActiveToday(habit));
// //   const completedToday = todaysHabits.filter(habit => habit.completions[today]).length;
// //   const completionRate = todaysHabits.length > 0 ? Math.round((completedToday / todaysHabits.length) * 100) : 0;
// //   const streak = HabitService.calculateStreak(habits);
// //   const weeklyStats = HabitService.getWeeklyStats(habits);

// //   const totalCompletions = habits.reduce((total, habit) => {
// //     return total + Object.values(habit.completions).filter(Boolean).length;
// //   }, 0);

// //   const bestStreak = Math.max(streak, 0);

// //   const stats = [
// //     { label: 'Active Habits', value: habits.length.toString(), icon: Target, color: '#3B82F6' },
// //     { label: 'Current Streak', value: `${streak}`, icon: Flame, color: '#F59E0B' },
// //     { label: 'Completion Rate', value: `${completionRate}%`, icon: TrendingUp, color: '#10B981' },
// //   ];

// //   const achievements = [
// //     { label: 'Total Completions', value: totalCompletions.toString(), icon: Award, color: '#8B5CF6' },
// //     { label: 'Best Streak', value: `${bestStreak}`, icon: Star, color: '#F59E0B' },
// //     { label: 'Weekly Average', value: `${weeklyStats.average}%`, icon: BarChart3, color: '#06B6D4' },
// //   ];

// //   const menuSections = [
// //     {
// //       title: 'Preferences',
// //       items: [
// //         { icon: Settings, label: 'App Settings', onPress: () => Alert.alert('Coming Soon', 'Settings will be available in the next update!') },
// //         { icon: Bell, label: 'Notifications', onPress: () => Alert.alert('Coming Soon', 'Notification settings coming soon!') },
// //         { icon: Shield, label: 'Privacy', onPress: () => Alert.alert('Privacy', 'Your data is stored securely and never shared with third parties.') },
// //       ]
// //     },
// //     {
// //       title: 'Support',
// //       items: [
// //         { icon: HelpCircle, label: 'Help & FAQ', onPress: () => Alert.alert('Help', 'For support, please contact us at support@habittracker.app') },
// //         { icon: Mail, label: 'Contact Us', onPress: () => Alert.alert('Contact', 'Email us at support@habittracker.app for any questions or feedback!') },
// //       ]
// //     }
// //   ];

// //   const getUserDisplayName = () => {
// //     if (user?.displayName) return user.displayName;
// //     if (user?.email) return user.email.split('@')[0];
// //     return 'Habit Tracker User';
// //   };

// //   const getGreeting = () => {
// //     const hour = new Date().getHours();
// //     if (hour < 12) return 'Good morning! 🌅';
// //     if (hour < 17) return 'Good afternoon! ☀️';
// //     return 'Good evening! 🌙';
// //   };

// //   return (
// //     <ScrollView 
// //       style={styles.container}
// //       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
// //     >
// //       <View style={styles.header}>
// //         <View style={styles.avatarContainer}>
// //           <User size={48} color="#FFFFFF" />
// //         </View>
// //         <Text style={styles.greeting}>{getGreeting()}</Text>
// //         <Text style={styles.name}>{getUserDisplayName()}</Text>
// //         <Text style={styles.email}>{user?.email || 'demo@example.com'}</Text>
        
// //         <View style={styles.headerStats}>
// //           <View style={styles.headerStat}>
// //             <Text style={styles.headerStatValue}>{completedToday}</Text>
// //             <Text style={styles.headerStatLabel}>Today</Text>
// //           </View>
// //           <View style={styles.headerStatDivider} />
// //           <View style={styles.headerStat}>
// //             <Text style={styles.headerStatValue}>{streak}</Text>
// //             <Text style={styles.headerStatLabel}>Streak</Text>
// //           </View>
// //           <View style={styles.headerStatDivider} />
// //           <View style={styles.headerStat}>
// //             <Text style={styles.headerStatValue}>{habits.length}</Text>
// //             <Text style={styles.headerStatLabel}>Habits</Text>
// //           </View>
// //         </View>
// //       </View>

// //       <View style={styles.statsContainer}>
// //         <Text style={styles.sectionTitle}>📊 Your Progress</Text>
// //         <View style={styles.statsGrid}>
// //           {stats.map((stat, index) => (
// //             <View key={index} style={styles.statCard}>
// //               <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}15` }]}>
// //                 <stat.icon size={24} color={stat.color} />
// //               </View>
// //               <Text style={styles.statValue}>{stat.value}</Text>
// //               <Text style={styles.statLabel}>{stat.label}</Text>
// //             </View>
// //           ))}
// //         </View>
// //       </View>

// //       <View style={styles.achievementsContainer}>
// //         <Text style={styles.sectionTitle}>🏆 Achievements</Text>
// //         <View style={styles.achievementsGrid}>
// //           {achievements.map((achievement, index) => (
// //             <View key={index} style={styles.achievementCard}>
// //               <View style={[styles.achievementIconContainer, { backgroundColor: `${achievement.color}15` }]}>
// //                 <achievement.icon size={20} color={achievement.color} />
// //               </View>
// //               <View style={styles.achievementContent}>
// //                 <Text style={styles.achievementValue}>{achievement.value}</Text>
// //                 <Text style={styles.achievementLabel}>{achievement.label}</Text>
// //               </View>
// //             </View>
// //           ))}
// //         </View>
// //       </View>

// //       {menuSections.map((section, sectionIndex) => (
// //         <View key={sectionIndex} style={styles.section}>
// //           <Text style={styles.sectionTitle}>
// //             {section.title === 'Preferences' ? '⚙️ Preferences' : '💬 Support'}
// //           </Text>
          
// //           <View style={styles.menuContainer}>
// //             {section.items.map((item, itemIndex) => (
// //               <TouchableOpacity 
// //                 key={itemIndex} 
// //                 style={[
// //                   styles.menuItem,
// //                   itemIndex === section.items.length - 1 && styles.menuItemLast
// //                 ]} 
// //                 activeOpacity={0.7}
// //                 onPress={item.onPress}
// //               >
// //                 <View style={styles.menuLeft}>
// //                   <View style={styles.menuIconContainer}>
// //                     <item.icon size={20} color="#64748B" />
// //                   </View>
// //                   <Text style={styles.menuText}>{item.label}</Text>
// //                 </View>
// //                 <ChevronRight size={16} color="#CBD5E1" />
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </View>
// //       ))}

// //       <TouchableOpacity
// //         style={styles.logoutButton}
// //         onPress={handleLogout}
// //         activeOpacity={0.7}
// //       >
// //         <LogOut size={20} color="#EF4444" />
// //         <Text style={styles.logoutText}>Sign Out</Text>
// //       </TouchableOpacity>

// //       <View style={styles.footer}>
// //         <Text style={styles.footerText}>Habit Tracker v1.0.0</Text>
// //         <Text style={styles.footerSubtext}>Built with ❤️ for better habits</Text>
// //       </View>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#F8FAFC',
// //   },
// //   header: {
// //     alignItems: 'center',
// //     paddingHorizontal: 24,
// //     paddingTop: 60,
// //     paddingBottom: 32,
// //     backgroundColor: '#3B82F6',
// //     borderBottomLeftRadius: 24,
// //     borderBottomRightRadius: 24,
// //   },
// //   avatarContainer: {
// //     width: 80,
// //     height: 80,
// //     borderRadius: 40,
// //     backgroundColor: 'rgba(255, 255, 255, 0.2)',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 12,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     elevation: 8,
// //   },
// //   greeting: {
// //     fontSize: 16,
// //     color: 'rgba(255, 255, 255, 0.9)',
// //     marginBottom: 4,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#FFFFFF',
// //     marginBottom: 4,
// //   },
// //   email: {
// //     fontSize: 16,
// //     color: 'rgba(255, 255, 255, 0.8)',
// //     marginBottom: 20,
// //   },
// //   headerStats: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(255, 255, 255, 0.15)',
// //     borderRadius: 16,
// //     paddingHorizontal: 20,
// //     paddingVertical: 12,
// //   },
// //   headerStat: {
// //     alignItems: 'center',
// //     flex: 1,
// //   },
// //   headerStatValue: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#FFFFFF',
// //   },
// //   headerStatLabel: {
// //     fontSize: 12,
// //     color: 'rgba(255, 255, 255, 0.8)',
// //     marginTop: 2,
// //   },
// //   headerStatDivider: {
// //     width: 1,
// //     height: 30,
// //     backgroundColor: 'rgba(255, 255, 255, 0.3)',
// //     marginHorizontal: 16,
// //   },
// //   statsContainer: {
// //     paddingHorizontal: 24,
// //     paddingVertical: 24,
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#1E293B',
// //     marginBottom: 16,
// //   },
// //   statsGrid: {
// //     flexDirection: 'row',
// //     gap: 12,
// //   },
// //   statCard: {
// //     flex: 1,
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 16,
// //     padding: 16,
// //     alignItems: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   statIconContainer: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginBottom: 8,
// //   },
// //   statValue: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#1E293B',
// //     marginBottom: 4,
// //   },
// //   statLabel: {
// //     fontSize: 12,
// //     color: '#64748B',
// //     textAlign: 'center',
// //   },
// //   achievementsContainer: {
// //     paddingHorizontal: 24,
// //     marginBottom: 24,
// //   },
// //   achievementsGrid: {
// //     gap: 12,
// //   },
// //   achievementCard: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 16,
// //     padding: 16,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   achievementIconContainer: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginRight: 12,
// //   },
// //   achievementContent: {
// //     flex: 1,
// //   },
// //   achievementValue: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#1E293B',
// //   },
// //   achievementLabel: {
// //     fontSize: 14,
// //     color: '#64748B',
// //     marginTop: 2,
// //   },
// //   section: {
// //     paddingHorizontal: 24,
// //     marginBottom: 24,
// //   },
// //   menuContainer: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 16,
// //     overflow: 'hidden',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   menuItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingVertical: 16,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#F1F5F9',
// //   },
// //   menuItemLast: {
// //     borderBottomWidth: 0,
// //   },
// //   menuLeft: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 12,
// //   },
// //   menuIconContainer: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     backgroundColor: '#F8FAFC',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   menuText: {
// //     fontSize: 16,
// //     color: '#1E293B',
// //     fontWeight: '500',
// //   },
// //   logoutButton: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     gap: 8,
// //     backgroundColor: '#FEF2F2',
// //     marginHorizontal: 24,
// //     paddingVertical: 16,
// //     borderRadius: 16,
// //     marginBottom: 24,
// //     borderWidth: 1,
// //     borderColor: '#FECACA',
// //   },
// //   logoutText: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#EF4444',
// //   },
// //   footer: {
// //     alignItems: 'center',
// //     paddingHorizontal: 24,
// //     paddingBottom: 32,
// //   },
// //   footerText: {
// //     fontSize: 14,
// //     color: '#64748B',
// //     marginBottom: 4,
// //   },
// //   footerSubtext: {
// //     fontSize: 12,
// //     color: '#94A3B8',
// //   },
// // });

// import React, { useState, useEffect, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   RefreshControl,
//   StatusBar,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import { useAuth } from '@/context/AuthContext';
// import { HabitService } from '@/service/habitService';
// import { Habit } from '@/types/habit';
// import { LinearGradient } from 'expo-linear-gradient';
// import { 
//   User, 
//   LogOut, 
//   Settings, 
//   Target, 
//   TrendingUp, 
//   Award,
//   Flame,
//   BarChart3,
//   Bell,
//   Shield,
//   HelpCircle,
//   Star,
//   ChevronRight,
//   Zap
// } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// export default function ProfileScreen() {
//   const { user, logout } = useAuth();
//   const [habits, setHabits] = useState<Habit[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // --- Real-time Subscription ---
//   useEffect(() => {
//     if (!user) return;
    
//     //   Live Update 
//     const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
//       setHabits(userHabits);
//       setLoading(false);
//     });

//     return () => unsubscribe(); 
//   }, [user]);

//   // --- Calculated Live Data (Memoized for Performance) ---
//   const liveStats = useMemo(() => {
//     const today = HabitService.getTodayString();
//     const todaysHabits = habits.filter(h => HabitService.isHabitActiveToday(h));
//     const completedToday = todaysHabits.filter(h => h.completions[today]).length;
//     const completionRate = todaysHabits.length > 0 ? Math.round((completedToday / todaysHabits.length) * 100) : 0;
//     const currentStreak = HabitService.calculateStreak(habits);
    
//     const totalCompletions = habits.reduce((acc, h) => 
//       acc + Object.values(h.completions).filter(Boolean).length, 0);

//     return { completedToday, currentStreak, completionRate, totalCompletions, activeCount: habits.length };
//   }, [habits]);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     // දත්ත refresh කිරීම (Firebase subscribe නිසා මෙය ස්වයංක්‍රීයව සිදු වේ, නමුත් user ට දැනෙන්නට refresh එකක් අවශ්‍යයි)
//     setTimeout(() => setRefreshing(false), 1000);
//   };

//   const handleLogout = () => {
//     Alert.alert('Sign Out', 'Do you really want to sign out of your account?', [
//       { text: 'Stay', style: 'cancel' },
//       { text: 'Sign Out', style: 'destructive', onPress: logout }
//     ]);
//   };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return { text: 'Good Morning', icon: '🌅' };
//     if (hour < 17) return { text: 'Good Afternoon', icon: '☀️' };
//     return { text: 'Good Evening', icon: '🌙' };
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView 
//         showsVerticalScrollIndicator={false}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />}
//       >
//         {/* --- Header Section --- */}
//         <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.header}>
//           <View style={styles.headerTop}>
//             <View style={styles.glassAvatar}>
//               <User size={38} color="#FFF" strokeWidth={1.5} />
//             </View>
//             <View style={styles.headerTextContainer}>
//               <Text style={styles.greetingText}>{getGreeting().text} {getGreeting().icon}</Text>
//               <Text style={styles.nameText}>{user?.displayName || user?.email?.split('@')[0] || 'User'}</Text>
//             </View>
//             <TouchableOpacity style={styles.notifBtn}>
//               <Bell size={22} color="#94A3B8" />
//             </TouchableOpacity>
//           </View>

//           {/* Quick Stats Banner */}
//           <View style={styles.quickStatsRow}>
//             <View style={styles.quickStatItem}>
//               <Text style={styles.quickStatVal}>{liveStats.completedToday}</Text>
//               <Text style={styles.quickStatLabel}>Today</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.quickStatItem}>
//               <Text style={styles.quickStatVal}>{liveStats.currentStreak}</Text>
//               <Text style={styles.quickStatLabel}>Streak</Text>
//             </View>
//             <View style={styles.statDivider} />
//             <View style={styles.quickStatItem}>
//               <Text style={styles.quickStatVal}>{liveStats.activeCount}</Text>
//               <Text style={styles.quickStatLabel}>Habits</Text>
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.contentBody}>
//           {/* --- Live Progress Card --- */}
//           <View style={styles.progressSection}>
//             <View style={styles.sectionHeader}>
//               <Text style={styles.sectionTitle}>Performance Analytics</Text>
//               <BarChart3 size={18} color="#6366F1" />
//             </View>
            
//             <View style={styles.statsGrid}>
//               <View style={styles.statBox}>
//                 <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
//                   <Target size={20} color="#6366F1" />
//                 </View>
//                 <Text style={styles.statNumber}>{liveStats.completionRate}%</Text>
//                 <Text style={styles.statDesc}>Daily Rate</Text>
//               </View>

//               <View style={styles.statBox}>
//                 <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
//                   <Flame size={20} color="#F59E0B" />
//                 </View>
//                 <Text style={styles.statNumber}>{liveStats.currentStreak}</Text>
//                 <Text style={styles.statDesc}>Best Streak</Text>
//               </View>

//               <View style={styles.statBox}>
//                 <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
//                   <Zap size={20} color="#10B981" />
//                 </View>
//                 <Text style={styles.statNumber}>{liveStats.totalCompletions}</Text>
//                 <Text style={styles.statDesc}>Total Hits</Text>
//               </View>
//             </View>
//           </View>

//           {/* --- Menu Card 1: Account --- */}
//           <Text style={styles.menuGroupLabel}>Management</Text>
//           <View style={styles.menuCard}>
//             <MenuOption icon={Settings} label="App Preferences" />
//             <MenuOption icon={Shield} label="Security & Privacy" />
//             <MenuOption icon={Award} label="My Achievements" isLast />
//           </View>

//           {/* --- Menu Card 2: Support --- */}
//           <Text style={styles.menuGroupLabel}>Reach Out</Text>
//           <View style={styles.menuCard}>
//             <MenuOption icon={HelpCircle} label="Help Center" />
//             <MenuOption icon={Star} label="Rate Experience" isLast />
//           </View>

//           {/* --- Logout --- */}
//           <TouchableOpacity style={styles.logoutWrapper} onPress={handleLogout}>
//             <LogOut size={20} color="#EF4444" />
//             <Text style={styles.logoutLabel}>Sign Out From Account</Text>
//           </TouchableOpacity>

//           <View style={styles.footerInfo}>
//             <Text style={styles.versionLabel}>Version 1.0.4 Premium</Text>
//             <Text style={styles.footerNote}>© 2026 Habit Tracker Studio</Text>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// // --- Helper Component for Menu Items ---
// const MenuOption = ({ icon: Icon, label, isLast }: any) => (
//   <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
//     <View style={styles.menuItemLeft}>
//       <View style={styles.menuIconBox}>
//         <Icon size={18} color="#475569" strokeWidth={2} />
//       </View>
//       <Text style={styles.menuItemText}>{label}</Text>
//     </View>
//     <ChevronRight size={16} color="#CBD5E1" />
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8FAFC' },
//   header: {
//     paddingTop: Platform.OS === 'ios' ? 70 : 50,
//     paddingBottom: 40,
//     paddingHorizontal: 24,
//     borderBottomLeftRadius: 35,
//     borderBottomRightRadius: 35,
//   },
//   headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
//   glassAvatar: {
//     width: 65,
//     height: 65,
//     borderRadius: 22,
//     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTextContainer: { flex: 1, marginLeft: 16 },
//   greetingText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
//   nameText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
//   notifBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.08)', justifyContent: 'center', alignItems: 'center' },
  
//   quickStatsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
//   quickStatItem: { alignItems: 'center' },
//   quickStatVal: { color: '#FFF', fontSize: 20, fontWeight: '800' },
//   quickStatLabel: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 11, fontWeight: '600', marginTop: 2 },
//   statDivider: { width: 1, height: 25, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignSelf: 'center' },

//   contentBody: { paddingHorizontal: 20, paddingTop: 30 },
//   progressSection: { backgroundColor: '#FFF', borderRadius: 28, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
//   sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
//   statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
//   statBox: { width: '31%', alignItems: 'center' },
//   iconCircle: { width: 46, height: 46, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
//   statNumber: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
//   statDesc: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2 },

//   menuGroupLabel: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginTop: 30, marginBottom: 12, marginLeft: 5 },
//   menuCard: { backgroundColor: '#FFF', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.04, elevation: 2 },
//   menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
//   menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
//   menuIconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
//   menuItemText: { fontSize: 15, fontWeight: '600', color: '#1E293B' },

//   logoutWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40, backgroundColor: '#FFF', paddingVertical: 18, borderRadius: 24, borderWidth: 1, borderColor: '#FEE2E2' },
//   logoutLabel: { color: '#EF4444', fontSize: 16, fontWeight: '700' },

//   footerInfo: { alignItems: 'center', marginTop: 40, paddingBottom: 50 },
//   versionLabel: { color: '#94A3B8', fontSize: 13, fontWeight: '700' },
//   footerNote: { color: '#CBD5E1', fontSize: 11, marginTop: 4 }
// });
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
  StatusBar,
  Platform,
  Dimensions,
  Image, // Image පෙන්වීමට එකතු කළා
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { HabitService } from '@/service/habitService';
import { Habit } from '@/types/habit';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker'; // Camera access සඳහා
import { 
  User, 
  LogOut, 
  Settings, 
  Target, 
  TrendingUp, 
  Award,
  Flame,
  BarChart3,
  Bell,
  Shield,
  HelpCircle,
  Star,
  ChevronRight,
  Zap,
  Camera // Camera icon එක සඳහා
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null); // Profile image state

  // --- Real-time Subscription ---
  useEffect(() => {
    if (!user) return;
    const unsubscribe = HabitService.subscribeUserHabits(user.uid, (userHabits) => {
      setHabits(userHabits);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, [user]);

  // --- Camera & Gallery Access Logic ---
  const handleProfilePicture = () => {
    Alert.alert(
      "Profile Picture",
      "Choose an option to update your profile photo",
      [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose from Gallery",
          onPress: pickImage,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need gallery permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // --- Calculated Live Data ---
  const liveStats = useMemo(() => {
    const today = HabitService.getTodayString();
    const todaysHabits = habits.filter(h => HabitService.isHabitActiveToday(h));
    const completedToday = todaysHabits.filter(h => h.completions[today]).length;
    const completionRate = todaysHabits.length > 0 ? Math.round((completedToday / todaysHabits.length) * 100) : 0;
    const currentStreak = HabitService.calculateStreak(habits);
    const totalCompletions = habits.reduce((acc, h) => 
      acc + Object.values(h.completions).filter(Boolean).length, 0);

    return { completedToday, currentStreak, completionRate, totalCompletions, activeCount: habits.length };
  }, [habits]);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Do you really want to sign out of your account?', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
          try { await logout(); } catch (e) { Alert.alert("Error", "Logout failed"); }
        } 
      }
    ]);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon', icon: '☀️' };
    return { text: 'Good Evening', icon: '🌙' };
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />}
      >
        {/* --- Header Section --- */}
        <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity onPress={handleProfilePicture} activeOpacity={0.8}>
              <View style={styles.glassAvatar}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                ) : (
                  <User size={38} color="#FFF" strokeWidth={1.5} />
                )}
                <View style={styles.cameraBadge}>
                  <Camera size={12} color="#FFF" />
                </View>
              </View>
            </TouchableOpacity>
            
            <View style={styles.headerTextContainer}>
              <Text style={styles.greetingText}>{getGreeting().text} {getGreeting().icon}</Text>
              <Text style={styles.nameText}>{user?.displayName || user?.email?.split('@')[0] || 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Bell size={22} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats Banner */}
          <View style={styles.quickStatsRow}>
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatVal}>{liveStats.completedToday}</Text>
              <Text style={styles.quickStatLabel}>Today</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatVal}>{liveStats.currentStreak}</Text>
              <Text style={styles.quickStatLabel}>Streak</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.quickStatItem}>
              <Text style={styles.quickStatVal}>{liveStats.activeCount}</Text>
              <Text style={styles.quickStatLabel}>Habits</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentBody}>
          {/* --- Live Progress Card --- */}
          <View style={styles.progressSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Performance Analytics</Text>
              <BarChart3 size={18} color="#6366F1" />
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
                  <Target size={20} color="#6366F1" />
                </View>
                <Text style={styles.statNumber}>{liveStats.completionRate}%</Text>
                <Text style={styles.statDesc}>Daily Rate</Text>
              </View>

              <View style={styles.statBox}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED' }]}>
                  <Flame size={20} color="#F59E0B" />
                </View>
                <Text style={styles.statNumber}>{liveStats.currentStreak}</Text>
                <Text style={styles.statDesc}>Best Streak</Text>
              </View>

              <View style={styles.statBox}>
                <View style={[styles.iconCircle, { backgroundColor: '#ECFDF5' }]}>
                  <Zap size={20} color="#10B981" />
                </View>
                <Text style={styles.statNumber}>{liveStats.totalCompletions}</Text>
                <Text style={styles.statDesc}>Total Hits</Text>
              </View>
            </View>
          </View>

          {/* --- Menu Card 1: Account --- */}
          <Text style={styles.menuGroupLabel}>Management</Text>
          <View style={styles.menuCard}>
            <MenuOption icon={Settings} label="App Preferences" />
            <MenuOption icon={Shield} label="Security & Privacy" />
            <MenuOption icon={Award} label="My Achievements" isLast />
          </View>

          {/* --- Menu Card 2: Support --- */}
          <Text style={styles.menuGroupLabel}>Reach Out</Text>
          <View style={styles.menuCard}>
            <MenuOption icon={HelpCircle} label="Help Center" />
            <MenuOption icon={Star} label="Rate Experience" isLast />
          </View>

          {/* --- Logout --- */}
          <TouchableOpacity style={styles.logoutWrapper} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutLabel}>Sign Out From Account</Text>
          </TouchableOpacity>

          <View style={styles.footerInfo}>
            <Text style={styles.versionLabel}>Version 1.0.4 Premium</Text>
            <Text style={styles.footerNote}>© 2026 Habit Tracker Studio</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const MenuOption = ({ icon: Icon, label, isLast }: any) => (
  <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.menuItemLeft}>
      <View style={styles.menuIconBox}>
        <Icon size={18} color="#475569" strokeWidth={2} />
      </View>
      <Text style={styles.menuItemText}>{label}</Text>
    </View>
    <ChevronRight size={16} color="#CBD5E1" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  glassAvatar: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#6366F1',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1E293B',
  },
  headerTextContainer: { flex: 1, marginLeft: 16 },
  greetingText: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  nameText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  notifBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.08)', justifyContent: 'center', alignItems: 'center' },
  
  quickStatsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  quickStatItem: { alignItems: 'center' },
  quickStatVal: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  quickStatLabel: { color: 'rgba(255, 255, 255, 0.5)', fontSize: 11, fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 25, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignSelf: 'center' },

  contentBody: { paddingHorizontal: 20, paddingTop: 30 },
  progressSection: { backgroundColor: '#FFF', borderRadius: 28, padding: 20, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { width: '31%', alignItems: 'center' },
  iconCircle: { width: 46, height: 46, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  statDesc: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 2 },

  menuGroupLabel: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginTop: 30, marginBottom: 12, marginLeft: 5 },
  menuCard: { backgroundColor: '#FFF', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.04, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  menuItemText: { fontSize: 15, fontWeight: '600', color: '#1E293B' },

  logoutWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 40, backgroundColor: '#FFF', paddingVertical: 18, borderRadius: 24, borderWidth: 1, borderColor: '#FEE2E2' },
  logoutLabel: { color: '#EF4444', fontSize: 16, fontWeight: '700' },

  footerInfo: { alignItems: 'center', marginTop: 40, paddingBottom: 50 },
  versionLabel: { color: '#94A3B8', fontSize: 13, fontWeight: '700' },
  footerNote: { color: '#CBD5E1', fontSize: 11, marginTop: 4 }
});