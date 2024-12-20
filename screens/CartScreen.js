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
import Feather from '@expo/vector-icons/Feather';

export default function CartScreen({ route, navigation }) {
  const [cartItems, setCartItems] = useState(route.params?.cartItems || []);
  const [grandTotal, setGrandTotal] = useState(0);

  React.useEffect(() => {
    if (route.params?.cartItem) {
      setCartItems((prev) => [...prev, route.params.cartItem]);
    }
  }, [route.params?.cartItem]);

  useEffect(() => {
    const total = cartItems.reduce(
      (total, item) => total + parseFloat(item.total),
      0
    );
    setGrandTotal(total);
  }, [cartItems]);

  const handleDelete = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddMore = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickUpHeader}>
        <MaterialIcons name="location-on" size={24} color="#aac27e" />
        <Text style={styles.pickUpText}>SELF PICK-UP</Text>
      </View>
      <View>
        <Text style={styles.pickUpDetailsTitle}>
          PICK-UP KOFI - Ororama SuperMarket Cogon
        </Text>
        <Text style={styles.pickUpDetailsAddress}>
          Ground Floor beside MLhuiller, Ororama Supermarket Cogon, Misamis
          Oriental, J.R, Borja St, Brgy. 39, Cagayan de Oro
        </Text>
      </View>

      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>YOUR ORDER</Text>
        <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMore}>
          <Text style={styles.addMoreButtonText}>
            <Feather name="plus-circle" size={16} color="white" /> Add items
          </Text>
        </TouchableOpacity>
      </View>

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
                onPress={() => handleDelete(index)}>
                <Feather name="trash-2" size={24} color="#aac27e" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.totalsContainer}>
          <View style={styles.grandTotalContainer}>
            <Text style={styles.grandTotalText}>
              Total: ₱{grandTotal.toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.checkoutButton}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.checkoutText}>Placed Order</Text>
          <Feather name="arrow-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 20,
  },
  pickUpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickUpText: {
    fontSize: 23,
    fontWeight: '700',
    color: '#aac27e',
    marginLeft: 10,
  },
  pickUpDetailsTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  pickUpDetailsAddress: {
    fontSize: 12,
    fontWeight: '200',
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  orderTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#aac27e',
  },
addMoreButtonText: {
  color: 'white',
  fontSize: 14,
  flexDirection: 'row',
  alignItems: 'center',
},
  addMoreButton: {
    backgroundColor: '#aac27e',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
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
    borderRadius: 10,
  },
  grandTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  grandTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  checkoutButton: {
    backgroundColor: '#aac27e',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
