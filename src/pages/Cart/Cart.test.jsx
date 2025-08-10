import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Cart from '../Cart/Cart'

const mockContextValue = {
  cart: [],
  handleQuantityDecrement: vi.fn(),
  handleRemoveFromCart: vi.fn(),
  handleAddToCart: vi.fn(),
  error: null,
  loading: false
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useOutletContext: () => mockContextValue
  }
})

describe('Cart Component', () => {
  
  beforeEach(() => {
    mockContextValue.handleQuantityDecrement.mockClear()
    mockContextValue.handleRemoveFromCart.mockClear() 
    mockContextValue.handleAddToCart.mockClear()
    mockContextValue.cart = []
    mockContextValue.loading = false
    mockContextValue.error = null
  })

  it('shows empty cart message when cart is empty', () => {
    render(<Cart />)
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('displays cart items correctly', () => {
    mockContextValue.cart = [
      {
        id: 1,
        title: 'Test Product',
        image: 'test.jpg',
        price: 29.99,
        quantity: 2
      }
    ]
    
    render(<Cart />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$29.99')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })


  it('calls increment function when + button clicked', async () => {
    const user = userEvent.setup()
    
    mockContextValue.cart = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 2 }
    ]
    
    render(<Cart />)
    
    const incrementButton = screen.getByRole('button', { name: '+' })
    await user.click(incrementButton)
    
    expect(mockContextValue.handleAddToCart).toHaveBeenCalledWith(1)
  })

  it('calls decrement function when - button clicked', async () => {
    const user = userEvent.setup()
    
    mockContextValue.cart = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 2 }
    ]
    
    render(<Cart />)
    
    const decrementButton = screen.getByRole('button', { name: '-' })
    await user.click(decrementButton)
    
    expect(mockContextValue.handleQuantityDecrement).toHaveBeenCalledWith(1)
  })

  it('calls remove function when trash button clicked', async () => {
    const user = userEvent.setup()
    
    mockContextValue.cart = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 2 }
    ]
    
    render(<Cart />)
    
    const removeButton = screen.getByTestId('remove-btn')
    await user.click(removeButton)
    
    expect(mockContextValue.handleRemoveFromCart).toHaveBeenCalledWith(1)
  })


  it('calculates and displays correct totals', () => {
    mockContextValue.cart = [
      { id: 1, title: 'Product 1', price: 10, quantity: 2 }, // $20
      { id: 2, title: 'Product 2', price: 15, quantity: 1 }  // $15
    ]
    
    render(<Cart />)
    
    expect(screen.getByText('Total (3 items):')).toBeInTheDocument()
    expect(screen.getByText('$35.00')).toBeInTheDocument()
  })


  it('shows checkout button when cart has items', () => {
    mockContextValue.cart = [
      { id: 1, title: 'Test Product', price: 29.99, quantity: 1 }
    ]
    
    render(<Cart />)
    
    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
  })
})