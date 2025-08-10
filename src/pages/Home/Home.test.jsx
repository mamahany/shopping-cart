// src/pages/__tests__/Home.test.jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Home from '../Home/Home'

describe('Home Component', () => {

  const renderHomeWithRouter = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
  }

  it('renders the welcome message and tagline', () => {
    renderHomeWithRouter()
    
    expect(screen.getByText('Welcome to Star Mart')).toBeInTheDocument()
    expect(screen.getByText('Find everything you love in one place')).toBeInTheDocument()
  })

  it('renders the shop now link', () => {
    renderHomeWithRouter()
    
    const shopLink = screen.getByRole('link', { name: /shop now/i })
    expect(shopLink).toBeInTheDocument()
  })

  it('shop now link points to the shop page', () => {
    renderHomeWithRouter()
    
    const shopLink = screen.getByRole('link', { name: /shop now/i })
    
    expect(shopLink).toHaveAttribute('href', '/shop')
  })

  it('has proper heading hierarchy', () => {
    renderHomeWithRouter()
    
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toHaveTextContent('Welcome to Star Mart')
  })

  it('shop now link is clickable', async () => {
    const user = userEvent.setup()
    
    renderHomeWithRouter()
    
    const shopLink = screen.getByRole('link', { name: /shop now/i })
    
    expect(shopLink).toBeInTheDocument()
    
    await user.click(shopLink)
    expect(shopLink).toHaveAttribute('href', '/shop')
  })


  it('renders content within a hero section', () => {
    renderHomeWithRouter()

    const heroSection = screen.getByText('Welcome to Star Mart').closest('section')
    expect(heroSection).toBeInTheDocument()
  })


  it('displays all expected text content', () => {
    renderHomeWithRouter()
    
    const expectedTexts = [
      'Welcome to Star Mart',
      'Find everything you love in one place',
      'Shop Now'
    ]
    
    expectedTexts.forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('does not render unexpected elements', () => {
    renderHomeWithRouter()
    
    expect(screen.queryByText('Cart')).not.toBeInTheDocument()
    expect(screen.queryByText('Add to Cart')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument()
  })
})