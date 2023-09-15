import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const Products = ()  => { // Initialize state variables using the useState hook:
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); 
  

  useEffect(() => { // get items from fake API by using fetch
      fetch('https://fakestoreapi.com/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Could not fetch the data'); //handling error
          }
          return response.json();
        })
        .then((data: Product[]) => {
          console.log(data);
          setProducts(data);
          setIsLoading(false);
          setError(null);

          // Save fetched products in localStorage
          localStorage.setItem('fetchedProducts', JSON.stringify(data));
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
  }, []);


  return (
    <div>
      <ul className='product-container'>
        {isLoading && <p>Loading...</p>}
        {error && <h2>{error}</h2>}
        {products.map((product: Product) => ( // maps through the products and render ProductCard component for each product. Passing the data as a prop
          <ProductCard key={product.id} product={product}/>
        ))}
      
      </ul>
  
    </div>
  );
};

export default Products;



