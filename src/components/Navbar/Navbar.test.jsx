import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

describe('Navbar Component', () => {
  
  const renderNavbarWithRouter = (cart = [], initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Navbar cart={cart} />
      </MemoryRouter>
    )
  }

  it('renders all navigation links', () => {
    renderNavbarWithRouter()
    expect(screen.getByTestId('shop-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('cart-link')).toBeInTheDocument()
  })


  it('displays 0 when cart is empty', () => {
    const emptyCart = []
    renderNavbarWithRouter(emptyCart)
    
    expect(screen.getByText('0')).toBeInTheDocument()
  })


  it('displays correct total quantity from cart', () => {
    
    const mockCart = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
      { id: 3, quantity: 1 } 
    ]
    
    renderNavbarWithRouter(mockCart)
    
    expect(screen.getByText('6')).toBeInTheDocument()
  })

  it('has correct href attributes for all links', () => {
    renderNavbarWithRouter()
    
    const shopLink = screen.getByTestId('shop-link')
    const homeLink = screen.getByTestId('home-link')
    const cartLink = screen.getByTestId('cart-link')
    
    expect(shopLink).toHaveAttribute('href', '/shop')
    expect(homeLink).toHaveAttribute('href', '/')
    expect(cartLink).toHaveAttribute('href', '/cart')
  })

  it('applies active class to shop link when on shop page', () => {
    renderNavbarWithRouter([], '/shop')
    
    const shopLink = screen.getByTestId('shop-link')
    
    expect(shopLink.className).toContain('active')
  })
 
  it('applies active class to home link when on home page', () => {
    renderNavbarWithRouter([], '/')
    
    const homeLink = screen.getByTestId('home-link')
    
    expect(homeLink.className).toContain('active')
  })

  it('applies active class to cart link when on cart page', () => {
    renderNavbarWithRouter([], '/cart')
    
    const cartLink = screen.getByTestId('cart-link')
    
    expect(cartLink.className).toContain('active')
  })

  it('only highlights the current active route', () => {
    renderNavbarWithRouter([], '/shop')
    
    const shopLink = screen.getByTestId('shop-link')
    const homeLink = screen.getByTestId('home-link')
    const cartLink = screen.getByTestId('cart-link')
    
    expect(shopLink.className).toContain('active')
    expect(homeLink.className).not.toContain('active')
    expect(cartLink.className).not.toContain('active')
  })

  it('handles large cart quantities correctly', () => {
    const largeCart = [
      { id: 1, quantity: 25 },
      { id: 2, quantity: 15 },
      { id: 3, quantity: 10 }
    ]
    
    renderNavbarWithRouter(largeCart)
    
    expect(screen.getByText('50')).toBeInTheDocument()
  })
})