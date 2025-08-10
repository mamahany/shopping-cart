import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from '../ProductCard/ProductCard'

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    image: 'test-image.jpg',
    price: 29.99
  }


  const mockHandleAddToCart = vi.fn()

  beforeEach(() => {
    mockHandleAddToCart.mockClear()
  })

  it('renders product information correctly', () => {
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg')
  })

  it('starts with quantity of 1', () => {
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const quantityInput = screen.getByDisplayValue('1')
    expect(quantityInput).toBeInTheDocument()
  })


  it('increments quantity when + button is clicked', async () => {

    const user = userEvent.setup()
    
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    
    await user.click(incrementButton)
    
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })

  it('decrements quantity when - button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    const decrementButton = screen.getByRole('button', { name: '-' })
    
    await user.click(incrementButton)
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
    
    await user.click(decrementButton)
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })

  it('disables decrement button when quantity is 1', () => {
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const decrementButton = screen.getByRole('button', { name: '-' })
    expect(decrementButton).toBeDisabled()
  })

  it('disables increment button when quantity reaches 10', async () => {
    const user = userEvent.setup()
    
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    
    for (let i = 0; i < 9; i++) {
      await user.click(incrementButton)
    }
    
    expect(incrementButton).toBeDisabled()
    expect(screen.getByDisplayValue('10')).toBeInTheDocument()
  })


  it('calls handleAddToCart with correct parameters', async () => {
    const user = userEvent.setup()
    
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    
    await user.click(incrementButton)
    await user.click(incrementButton)
    

    await user.click(addToCartButton)
    
    expect(mockHandleAddToCart).toHaveBeenCalledWith(1, 3)
  })


  it('resets quantity to 1 after adding to cart', async () => {
    const user = userEvent.setup()
    
    render(
      <ProductCard 
        {...mockProduct}
        handleAddToCart={mockHandleAddToCart}
      />
    )
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    

    await user.click(incrementButton)
    await user.click(incrementButton)
    expect(screen.getByDisplayValue('3')).toBeInTheDocument()
    
    await user.click(addToCartButton)
    
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })
})