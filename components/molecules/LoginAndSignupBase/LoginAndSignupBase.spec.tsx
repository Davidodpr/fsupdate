import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import LoginAndSignupBase, { LoginAndSignupBaseProps } from './LoginAndSignupBase'

describe.skip('LoginAndSignupBase', () => {
  const desktopWidth = 1500
  const propsWithData = {
    children: <div>test</div>,
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: LoginAndSignupBaseProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <LoginAndSignupBase {...props} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })
  it('renders children', () => {
    expect.assertions(2)
    const { getAllByText } = renderComponent()
    expect(getAllByText('test')).not.toBeNull()
    expect(getAllByText('test')).toHaveLength(2)
  })
})
