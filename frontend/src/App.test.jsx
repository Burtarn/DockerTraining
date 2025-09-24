import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

    test('knappen ökar räknaren när man klickar', async () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /count is/i })
    expect(button).toHaveTextContent('count is 0')
    await userEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
    })
