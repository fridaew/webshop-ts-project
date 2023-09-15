import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useShoppingCart from '../context/CartContext';
import { Button } from 'react-bootstrap'

const ProductDetails = () => {

  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const { addItemToCart, openCart } = useShoppingCart();

  const handleAddToCart = (productId: number) => { //Define a function to handle adding a product to the shopping cart
    addItemToCart(productId);
    openCart()
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (response.ok) {
        const fetchedProductDetails: Product = await response.json();
        setProductDetails(fetchedProductDetails);
      } else {
        console.error('Failed to fetch product details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  return (
    <div className="product-details">
      {productDetails ? (
        <>
          <div className='product-details'>
            <div className='product-detail-top'>

              <img src={productDetails.image} alt="" width={201} height={230} />

              <div className='product-description'>
                <h4>{productDetails.title}</h4>
                <p className='description'>{productDetails.description}</p>
                <hr></hr>
                <div className='price'>{'$' + productDetails.price}</div>

                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>

                <ul className='color-variation'>
                  <li ><a href="#"></a><span className='red'></span></li>
                  <li ><a href="#"></a><span className='yellow'></span></li>
                  <li ><a href="#"></a><span className='babyBlue'></span></li>
                  <li>SKU: N/A</li>
                </ul>
                <Button onClick={() => handleAddToCart(productDetails.id)}>Add to Cart</Button>
                <div className='d-flex align-items-center justify-content-center' style={{ gap: '.5rem' }}>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
