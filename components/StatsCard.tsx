// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';
// // import { Video as LucideIcon } from 'lucide-react-native';

// // interface StatsCardProps {
// //   title: string;
// //   value: string;
// //   percentage: number;
// //   icon: typeof LucideIcon;
// //   color: string;
// // }

// // export default function StatsCard({ title, value, percentage, icon: Icon, color }: StatsCardProps) {
// //   return (
// //     <View style={[styles.container, { borderLeftColor: color }]}>
// //       <View style={styles.header}>
// //         <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
// //           <Icon size={20} color={color} />
// //         </View>
// //         <Text style={styles.percentage}>{percentage}%</Text>
// //       </View>
// //       <Text style={styles.value}>{value}</Text>
// //       <Text style={styles.title}>{title}</Text>
// //       <View style={styles.progressBar}>
// //         <View 
// //           style={[
// //             styles.progressFill, 
// //             { width: `${percentage}%`, backgroundColor: color }
// //           ]} 
// //         />
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     backgroundColor: '#FFFFFF',
// //     borderRadius: 16,
// //     padding: 16,
// //     marginRight: 16,
// //     minWidth: 160,
// //     borderLeftWidth: 4,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   header: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   iconContainer: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   percentage: {
// //     fontSize: 14,
// //     fontWeight: '600',
// //     color: '#64748B',
// //   },
// //   value: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     color: '#1E293B',
// //     marginBottom: 4,
// //   },
// //   title: {
// //     fontSize: 14,
// //     color: '#64748B',
// //     marginBottom: 12,
// //   },
// //   progressBar: {
// //     height: 4,
// //     backgroundColor: '#F1F5F9',
// //     borderRadius: 2,
// //     overflow: 'hidden',
// //   },
// //   progressFill: {
// //     height: '100%',
// //     borderRadius: 2,
// //   },
// // });

// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import { LucideIcon } from 'lucide-react-native';

// const { width } = Dimensions.get('window');

// interface StatsCardProps {
//   title: string;
//   value: string;
//   percentage: number;
//   icon: LucideIcon;
//   color: string;
// }

// export default function StatsCard({ title, value, percentage, icon: Icon, color }: StatsCardProps) {
//   return (
//     <View style={styles.container}>
//       {/* Accent Line at Top - Professional touch */}
//       <View style={[styles.accentLine, { backgroundColor: color }]} />
      
//       <View style={styles.header}>
//         <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
//           <Icon size={18} color={color} strokeWidth={2.5} />
//         </View>
//         <View style={styles.percentageBadge}>
//           <Text style={[styles.percentageText, { color: color }]}>{percentage}%</Text>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.valueText}>{value}</Text>
//         <Text style={styles.titleText}>{title}</Text>
//       </View>

//       <View style={styles.progressSection}>
//         <View style={styles.progressBar}>
//           <View 
//             style={[
//               styles.progressFill, 
//               { width: `${Math.min(percentage, 100)}%`, backgroundColor: color }
//             ]} 
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#1E293B', // Deep Slate
//     borderRadius: 20,
//     padding: 16,
//     marginRight: 12,
//     width: width * 0.42, // Responsive width
//     borderWidth: 1,
//     borderColor: '#334155',
//     overflow: 'hidden',
//     justifyContent: 'space-between',
//     height: 145, // Fixed height for alignment
//   },
//   accentLine: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     opacity: 0.8,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 36,
//     height: 36,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   percentageBadge: {
//     backgroundColor: '#0F172A',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#334155',
//   },
//   percentageText: {
//     fontSize: 10,
//     fontWeight: '800',
//   },
//   content: {
//     marginTop: 12,
//   },
//   valueText: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#F8FAFC',
//     letterSpacing: -0.5,
//   },
//   titleText: {
//     fontSize: 11,
//     color: '#64748B',
//     fontWeight: '600',
//     marginTop: 2,
//     textTransform: 'uppercase',
//     letterSpacing: 0.5,
//   },
//   progressSection: {
//     marginTop: 14,
//   },
//   progressBar: {
//     height: 5,
//     backgroundColor: '#0F172A',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     borderRadius: 10,
//   },
// });



import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatsCardProps {
  title: string;
  value: string;
  percentage: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, percentage, icon: Icon, color }: StatsCardProps) {
  return (
    <View style={styles.card}>
      {/* Background Decor - Meyen thama professional look eka enne */}
      <View style={[styles.bgCircle, { backgroundColor: color, opacity: 0.05 }]} />
      <View style={styles.iconWatermark}>
        <Icon size={80} color={color} opacity={0.03} strokeWidth={1} />
      </View>

      <View style={styles.mainContent}>
        {/* Top Section: Icon & Percentage */}
        <View style={styles.header}>
          <View style={[styles.iconWrapper, { backgroundColor: `${color}15` }]}>
            <Icon size={18} color={color} strokeWidth={2.5} />
          </View>
          <View style={styles.percentageContainer}>
            <Text style={[styles.percentageText, { color: color }]}>{percentage}%</Text>
          </View>
        </View>

        {/* Middle Section: Value & Title */}
        <View style={styles.infoArea}>
          <Text style={styles.valueText}>{value}</Text>
          <Text style={styles.titleText}>{title}</Text>
        </View>

        {/* Bottom Section: Modern Progress Bar */}
        <View style={styles.footer}>
          <View style={styles.progressTrack}>
            <View 
              style={[
                styles.progressActive, 
                { width: `${Math.min(percentage, 100)}%`, backgroundColor: color }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B', // Deep Slate
    borderRadius: 28,
    width: width * 0.44, 
    height: 160,
    marginRight: 12,
    padding: 20,
    overflow: 'hidden', // Watermark eka card eken eliyata yana nisa
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)', // Subtle glass border
    justifyContent: 'center',
  },
  bgCircle: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconWatermark: {
    position: 'absolute',
    bottom: -15,
    right: -10,
    transform: [{ rotate: '-15deg' }],
  },
  mainContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 11,
    fontWeight: '900',
  },
  infoArea: {
    marginTop: 10,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  titleText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  footer: {
    marginTop: 15,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  progressActive: {
    height: '100%',
    borderRadius: 10,
    // Add shadow to the bar itself
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});


