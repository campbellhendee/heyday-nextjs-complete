import React from 'react';
import ProductGrid from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';

const ShopPage = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <ProductGrid products={products} />
    </div>
  );
};

export default ShopPage;