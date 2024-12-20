import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CartScreen({ route }) {
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [grandTotal, setGrandTotal] = useState(0);

  React.useEffect(() => {
    if (route.params?.cartItem) {
      setCartItems((prev) => [...prev, route.params.cartItem]);
    }
  }, [route.params?.cartItem]);

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + parseFloat(item.total), 0);
    setGrandTotal(total);
  }, [cartItems]);

  const handleDelete = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.cartList}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Image
                source={{ uri: item.product.image }}
                style={styles.cartItemImage}
              />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.product.name}</Text>
                <View style={styles.addonsContainer}>
                  {item.selectedSize && (
                    <Text style={styles.addonText}>
                      Size: {item.selectedSize}
                    </Text>
                  )}
                  {item.selectedMilk && (
                    <Text style={styles.addonText}>
                      Milk: {item.selectedMilk}
                    </Text>
                  )}
                  {item.selectedTaste && (
                    <Text style={styles.addonText}>
                      Taste: {item.selectedTaste}
                    </Text>
                  )}
                </View>
                <View style={styles.priceQuantityContainer}>
                  <Text style={styles.cartItemTotal}>₱{item.total}</Text>
                  <Text style={styles.cartItemQuantity}>x{item.quantity}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.trashIconContainer}
                onPress={() => handleDelete(index)}
              >
                <MaterialIcons name="delete" size={24} color="#aac27e" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.totalsContainer}>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
              Subtotal: ₱{grandTotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.grandTotalContainer}>
            <Text style={styles.grandTotalText}>
              Grand Total: ₱{grandTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, marginTop: 20 },
  emptyCartText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  cartList: { paddingBottom: 5 },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addonsContainer: {
    marginTop: 2,
  },
  addonText: {
    fontSize: 12,
    color: 'gray',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  cartItemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#aac27e',
  },
  cartItemQuantity: {
    fontSize: 12,
    color: 'gray',
  },
  trashIconContainer: {
    marginLeft: 10,
  },
  totalsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  subtotalContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  subtotalText: { fontSize: 16 },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#aac27e',
  },
  checkoutButton: {
    backgroundColor: '#aac27e',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  checkoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
