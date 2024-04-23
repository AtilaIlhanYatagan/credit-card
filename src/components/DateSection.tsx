import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DateSectionProps {
  text: string;
  date: Date;
}

const DateSection: React.FC<DateSectionProps> = ({ text, date }) => {
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default DateSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop:12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#555555',
  },
  date: {
    fontSize: 16,
    color: '#333333',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
});
