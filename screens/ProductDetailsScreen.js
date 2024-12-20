import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params || {};

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product details are not available.</Text>
      </View>
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [basePrice] = useState(parseFloat(product.price.replace('₱', '')));
  const [total, setTotal] = useState(basePrice);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMilk, setSelectedMilk] = useState(null);
  const [selectedTaste, setSelectedTaste] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [popupOpacity] = useState(new Animated.Value(0));

  const updateOption = (optionType, optionValue, additionalPrice) => {
    if (optionType === 'size') {
      if (selectedSize === optionValue) {
        return; // Prevent duplicate price addition
      }
      setTotal((prev) => prev - (selectedSize ? 15 : 0) + additionalPrice);
      setSelectedSize(optionValue);
    }

    if (optionType === 'milk') {
      const previousMilkPrice =
        selectedMilk === 'oat' ? 30 : selectedMilk === 'soy' ? 20 : 0;
      if (selectedMilk === optionValue) {
        return; // Prevent duplicate price addition
      }
      setTotal((prev) => prev - previousMilkPrice + additionalPrice);
      setSelectedMilk(optionValue);
    }

    if (optionType === 'taste') {
      setSelectedTaste(optionValue); // No additional price for taste options
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      product,
      quantity,
      total: total * quantity,
      selectedSize,
      selectedMilk,
      selectedTaste,
    };

    // Display feedback animation
    setAddedToCart(true);
    Animated.timing(popupOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setAddedToCart(false);
      popupOpacity.setValue(0);
      navigation.navigate('Cart', { cartItem });
      navigation.navigate('Home');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#e8efdc" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfoCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Size Options:</Text>
        <View style={styles.optionGroup}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedSize === 'upsize' && styles.selectedOption,
            ]}
            onPress={() => updateOption('size', 'upsize', 15)}>
            <Text
              style={[
                styles.optionText,
                selectedSize === 'upsize' && styles.selectedText,
              ]}>
              Upsize (+₱15.00)
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Milk Options:</Text>
        <View style={styles.optionGroupRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedMilk === 'oat' && styles.selectedOption,
            ]}
            onPress={() => updateOption('milk', 'oat', 30)}>
            <Text
              style={[
                styles.optionText,
                selectedMilk === 'oat' && styles.selectedText,
              ]}>
              Oat Milk (+₱30.00)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedMilk === 'soy' && styles.selectedOption,
            ]}
            onPress={() => updateOption('milk', 'soy', 20)}>
            <Text
              style={[
                styles.optionText,
                selectedMilk === 'soy' && styles.selectedText,
              ]}>
              Soy Milk (+₱20.00)
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Taste Options:</Text>
        <View style={styles.optionGroupRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedTaste === 'lessSweet' && styles.selectedOption,
            ]}
            onPress={() => updateOption('taste', 'lessSweet', 0)}>
            <Text
              style={[
                styles.optionText,
                selectedTaste === 'lessSweet' && styles.selectedText,
              ]}>
              Less Sweet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedTaste === 'original' && styles.selectedOption,
            ]}
            onPress={() => updateOption('taste', 'original', 0)}>
            <Text
              style={[
                styles.optionText,
                selectedTaste === 'original' && styles.selectedText,
              ]}>
              Original Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.fixedBottom}>
        <View style={styles.quantityButtons}>
          <Ionicons
            name="remove"
            size={20}
            color="white"
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityButton}
          />
          <Text style={styles.quantity}>{quantity}</Text>
          <Ionicons
            name="add"
            size={20}
            color="white"
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityButton}
          />
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            Add to Cart - ₱{(total * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
      {addedToCart && (
        <Animated.View style={[styles.cartPopup, { opacity: popupOpacity }]}>
          <View style={styles.popupContent}>
            <Ionicons name="checkmark-circle" size={40} color="white" />
            <Text style={styles.popupText}>Added to Cart</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 15,
    zIndex: 2,
  },
  scrollContainer: { padding: 20 },
  imageContainer: {
    width: '100%',
    height: 300, 
    position: 'relative',
    marginBottom: 60,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
    position: 'absolute', 
  },
  productInfoCard: {
    position: 'absolute',
    bottom: -100, 
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1, 
    marginBottom: 50,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 2 },
  productPrice: { fontSize: 16, color: '#889b64', marginBottom: 2},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  optionGroup: { marginBottom: 5 },
  optionGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '48%',
    zIndex: 2, 
    margin: 5,
  },
  selectedOption: {
    backgroundColor: '#aac27e',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: 'white',
  },
  addonPrice: {
    fontSize: 14,
    color: '#465528',
  },
  specialInstructions: {
    height: 150, 
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
    paddingTop: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff', 
    fontSize: 14, 
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f5f5',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
  },
  quantityButton: {
    backgroundColor: '#aac27e',
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  quantity: { fontSize: 16 },
  addToCartButton: {
    backgroundColor: '#aac27e',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    width: '60%',
  },
  addToCartText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cartPopup: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  popupContent: {
    backgroundColor: '#aac27e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
});
