import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  {
    id: '1',
    name: 'Iced Dark Chocolate Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/fbdec38c57fef09c7465b96365cc7c9c.jpg??width=400',
    price: '₱89.00',
    description: 'Dark chocolate with creamy milk and rich espresso.',
  },
  {
    id: '2',
    name: 'Iced White Mocha Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/112a052c3d2a1d107e8be1231e7ea8a4.jpg??width=400',
    price: '₱99.00',
    description:
      'White chocolate with our creamy milk blend and rich espresso, over ice.',
  },
  {
    id: '3',
    name: 'Iced Kape Kastila (Spanish Latte)',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/bb807addf0d07f67c132264b2e1309c1.jpg??width=400',
    price: '₱80.00',
    description: 'Leche condensada, creamy milk and rich espresso, over ice.',
  },
  {
    id: '4',
    name: 'Iced Brown Sugar Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/541430e990ef13036bc788315a82d9e3.jpg??width=400',
    price: '₱85.00',
    description: 'Rich espresso with creamy milk and brown molasses syrup.',
  },
  {
    id: '5',
    name: 'Iced Caramel Macchiato',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/74475332c458e0cc0e9971b9131cf51e.jpg??width=400',
    price: '₱99.00',
    description: 'Rich espresso, creamy milk, vanilla, and buttery caramel.',
  },
  {
    id: '6',
    name: 'Iced Sea Salt Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/b898246f7d1a277b54e22b9496f176f3.jpg??width=400',
    price: '₱95.00',
    description:
      'Rich espresso with creamy milk, topped with sea salt milk foam, over ice.',
  },
];

const christmas = [
  {
    id: '001',
    name: 'Hot Toasted Chocolate Marshmallow',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/236396efc1c8d2410723e35cbde10976.jpg??width=400',
    price: '₱109.00',
    description:
      'Rich toasted chocolate and vanilla with steamed milk, topped with sea salt milk foam and marshmallows.',
  },
  {
    id: '002',
    name: 'Hot Peppermint Dark Mocha',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/4fc4ca7cbf22d64729625dfbf862baac.jpg??width=400',
    price: '₱109.00',
    description:
      'Peppermint dark chocolate with rich espresso and steamed milk.',
  },
  {
    id: '003',
    name: 'Hot Toffee Nut Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/5f60deae157c82947501e2687e183115.jpg??width=400',
    price: '₱109.00',
    description: 'Buttery toffee nut with rich espresso and steamed milk.',
  },
  {
    id: '004',
    name: 'Iced Toasted Chocolate Marshmallow',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/b753c133223b374c1487acde4f0692df.jpg??width=400',
    price: '₱109.00',
    description:
      'Rich toasted chocolate and vanilla with creamy milk, topped with sea salt milk foam and marshmallows, over ice.',
  },
  {
    id: '005',
    name: 'Iced Toffee Nut Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/800b844a7893c2a84d6dbdc98a124bd6.jpg??width=400',
    price: '₱109.00',
    description:
      'Buttery toffee nut with rich espresso and creamy milk, over ice.',
  },
  {
    id: '005',
    name: 'Iced Peppermint Dark Mocha',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/e0c15f50e2cd8d49f1b761d9c9f1612a.jpg??width=400',
    price: '₱109.00',
    description:
      'Peppermint dark chocolate with rich espresso and creamy milk, over ice.',
  },
];

const hotProduct = [
  {
    id: 'HP01',
    name: 'Hot Dark Chocolate Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/2a56ed32ee04fe61c24c64d5f33c4eba.jpg??width=400',
    price: '₱89.00',
    description:
      'Dark Chocolate with hot steamed milk and rich espresso.',
  },
    {
    id: 'HP06',
    name: 'Hot Vanilla Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/74da1f7ba52aba7e32744bfc264e3a2a.jpg??width=400',
    price: '₱90.00',
    description:
      'A velvety blend of creamy vanilla with hot steamed milk and rich espresso..',
  },  {
    id: 'HP02',
    name: 'Hot White Mocha Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/1fb3183946d2a562d19451d9b74a96d7.jpg??width=400',
    price: '₱99.00',
    description:
      'White chocolate with our hot steamed milk blend and rich espresso.',
  },  {
    id: 'HP03',
    name: 'Hot Kape Kastila (Spanish Latte)',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/d6be2c95af26ba4738a360146fd16ec3.jpg??width=400',
    price: '₱80.00',
    description:
      'Leche condensada, hot steamed milk and rich espresso.',
  },  {
    id: 'HP04',
    name: 'Hot Brown Sugar Latte',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/b9066ddd2c753be7cfced859b7d776db.jpg??width=400',
    price: '₱85.00',
    description:
      'Rich espresso with hot steamed milk and brown molasses syrup.',
  },  {
    id: 'HP05',
    name: 'Hot Caramel Macchiato',
    image:
      'https://images.deliveryhero.io/image/menu-import-gateway-prd/regions/AS/chains/mosaic_ph/ab4c3ad75bdf1fbf2a4a81545f7c6fef.jpg??width=400',
    price: '₱99.00',
    description:
      'Rich espresso, hot steamed milk, vanilla, and buttery caramel.',
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {' '}
        <Image
          source={{
            uri: 'https://scontent.fmnl13-3.fna.fbcdn.net/v/t39.30808-6/465592968_551633044292264_2402671005152608906_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGMI4WHAdb0WPUvhSZOS2Y2-1atc8SVkpv7Vq1zxJWSm-KnUCfHaoR-e_CMioiYXb_CX51GbqXnKiCCmduQOrwy&_nc_ohc=JGmTlamGll4Q7kNvgH6fuEx&_nc_zt=23&_nc_ht=scontent.fmnl13-3.fna&_nc_gid=Agm93UEMOk6bAYyBcFT2IOp&oh=00_AYBc0oQv1AKhtF7Gq_0LF7trBfZKx8lSfNs1S3u5nmcnPw&oe=676A05A9',
          }}
          style={styles.image}
        />
      </View>

      {/* Image below the header */}
      <View style={styles.imageWrapper}></View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={20}
          color="#aac27e"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Menu Section */}
      <ScrollView style={styles.menuContainer}>
        {/* Christmas Classics Section */}
        <Text style={styles.trySignaturesText}>NEW! Christmas Classics</Text>
        <View style={styles.menuRow}>
          {christmas.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
              }>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Must Try Signatures Section */}
        <Text style={styles.trySignaturesText}>
          Must Try! Signatures (ICED)
        </Text>
        <View style={styles.menuRow}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductDetails', { product })
                }>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResults}>No products found</Text>
          )}
        </View>

        {/* Must Try Signatures Section HOT */}
        <Text style={styles.trySignaturesText}>Must Try! Signatures (HOT)</Text>
        <View style={styles.menuRow}>
          {hotProduct.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetails', { product: item })
              }>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  header: {
    height: 200,
    backgroundColor: '#aac27e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  imageWrapper: {
    marginTop: -30, // Make sure the image doesn't overlap with the header
    width: '100%',
    height: 200, // Adjust height as needed
  },
  image: {
    width: '100%',
    height: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    marginTop: 30, // Adjust this for proper spacing after the image
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  trySignaturesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
  },
  menuContainer: { flex: 1, marginBottom: 2 },
  menuRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    alignItems: 'flex-start',
    width: '48%',
    elevation: 5,
    padding: 10,
    marginBottom: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 4,
    marginBottom: 10,
  },
  productName: { fontSize: 14, marginBottom: 5, color: '#333' },
  productPrice: { fontSize: 12, fontWeight: 'bold', color: '#aac27e' },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
