import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Chip, Button, useTheme, Divider } from 'react-native-paper';

const KitchenScreen = () => {
  const theme = useTheme();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Implement real-time order updates
  }, []);

  const getWaitTimeColor = (waitTime) => {
    if (waitTime > 30) return theme.colors.error;
    if (waitTime > 15) return theme.colors.warning;
    return theme.colors.success;
  };

  const OrderCard = ({ order }) => (
    <Card style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <Text variant="titleMedium">{order.customerName}</Text>
          <Chip
            mode="outlined"
            style={{ backgroundColor: getWaitTimeColor(order.waitTime) }}
          >
            {order.waitTime} min
          </Chip>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.itemsList}>
          {order.items.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text variant="bodyMedium">{item.quantity}x {item.pizzaType}</Text>
              <Text variant="bodySmall" style={styles.toppings}>
                {item.toppings.join(', ')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => handleStatusChange(order.id, 'ready')}
          >
            Mark Ready
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Kitchen Display
        </Text>
        <Chip icon="clock">
          {orders.length} Active Orders
        </Chip>
      </View>

      <View style={styles.ordersContainer}>
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  ordersContainer: {
    padding: 16,
  },
  orderCard: {
    marginBottom: 16,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  itemsList: {
    marginVertical: 8,
  },
  orderItem: {
    marginBottom: 8,
  },
  toppings: {
    color: 'gray',
  },
  actions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default KitchenScreen;
