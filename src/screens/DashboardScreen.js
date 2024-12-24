import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, useTheme, IconButton } from 'react-native-paper';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

const DashboardScreen = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({
    dailyStats: {
      totalOrders: 0,
      totalSales: 0,
      pendingOrders: 0,
      avgCompletionTime: 0,
      orderChange: 0
    }
  });

  // Fetch data from your web app's API
  useEffect(() => {
    // TODO: Implement API calls
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card style={styles.statCard}>
      <Card.Content>
        <View style={styles.statHeader}>
          <IconButton icon={icon} size={24} iconColor={color} />
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            {title}
          </Text>
        </View>
        <Text variant="headlineMedium" style={{ color }}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          John Dough's Dashboard
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Sourdough Pizza Excellence
        </Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Today's Orders"
          value={analytics.dailyStats.totalOrders}
          icon="pizza"
          color={theme.colors.primary}
        />
        <StatCard
          title="Revenue"
          value={`R${analytics.dailyStats.totalSales.toFixed(0)}`}
          icon="cash"
          color={theme.colors.success}
        />
        <StatCard
          title="Pending"
          value={analytics.dailyStats.pendingOrders}
          icon="clock-outline"
          color={theme.colors.warning}
        />
        <StatCard
          title="Avg Time"
          value={`${analytics.dailyStats.avgCompletionTime}m`}
          icon="timer-outline"
          color={theme.colors.info}
        />
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.chartTitle}>
            Order Timeline
          </Text>
          <VictoryChart
            theme={VictoryTheme.material}
            height={200}
            padding={{ top: 20, bottom: 40, left: 50, right: 20 }}
          >
            <VictoryLine
              style={{
                data: { stroke: theme.colors.primary }
              }}
              data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
              ]}
            />
            <VictoryAxis
              style={{
                axis: { stroke: theme.colors.onSurfaceVariant },
                tickLabels: { fill: theme.colors.onSurfaceVariant }
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: theme.colors.onSurfaceVariant },
                tickLabels: { fill: theme.colors.onSurfaceVariant }
              }}
            />
          </VictoryChart>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.7,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  statCard: {
    width: '45%',
    margin: 8,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartCard: {
    margin: 16,
    elevation: 2,
  },
  chartTitle: {
    marginBottom: 16,
  },
});

export default DashboardScreen;
