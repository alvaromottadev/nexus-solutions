import { FlatList, Text } from 'react-native';
import { styles } from './styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductType } from '../../types/ProductType';
import api from '../../client/api-client';
import ProductCard from '../../components/ProductCard/ProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button/Button';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [haveMore, setHaveMore] = useState<boolean>(true);

  const { token } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setPage(0);
      setHaveMore(true);
      getProducts(0).then(response => {
        setProducts(response.data.content);
        setIsLoading(false);
      });
    }, []),
  );

  useEffect(() => {
    getProducts(page).then(response => {
      if (response.data.content.length === 0) {
        setHaveMore(false);
        return;
      }
      if (page === 0) {
        setProducts(response.data.content);
      } else {
        setProducts(prevProducts => [
          ...prevProducts,
          ...response.data.content,
        ]);
      }
      setIsLoading(false);
    });
  }, [page]);

  async function getProducts(page: number) {
    return api.get(`/products?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function renderProductCard(product: ProductType) {
    return <ProductCard product={product} key={product.id} />;
  }

  function renderFooter() {
    return haveMore ? (
      <Button onPress={renderMore} style={styles.button}>
        <Text style={styles.buttonText}>Carregar mais produtos</Text>
      </Button>
    ) : (
      <Text style={styles.text}>Não possui mais produtos</Text>
    );
  }

  function renderMore() {
    console.log(page);
    setPage(prevPage => prevPage + 1);
  }

  return (
    !isLoading &&
    products.length > 0 && (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(__, index) => `product-${index}`}
          renderItem={({ item }) => renderProductCard(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      </SafeAreaView>
    )
  );
}
