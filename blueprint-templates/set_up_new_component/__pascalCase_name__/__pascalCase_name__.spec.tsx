import React from 'react'
import '@testing-library/jest-dom'
import { Context as ResponsiveContext } from 'react-responsive'
import { act } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {{pascalCase name}}, { {{pascalCase name}}Props } from './{{pascalCase name}}'

/* Mock api, hooks, helpers, trackers etc.
jest.mock('@api/[...]'); */

/* remock mocks
(myFuncMock as jest.Mock).mockResolvedValueOnce({
  data: { ...newData },
});

(myFuncMock as jest.Mock).mockImplementationOnce(() => {
    throw new Error();
  }); */

describe('{{pascalCase name}}', () => {
  const desktopWidth = 1500
  const propsWithData = {
   //Add default props here
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: {{pascalCase name}}Props = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
          <{{pascalCase name}} {...props} />
      </ResponsiveContext.Provider>
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container, debug } = renderComponent()
    debug()
    expect(container.firstChild).not.toBeNull()
  })
  it('Acts with act.', async () => {
    expect.assertions(1)
    const { getByRole, getByTestId } = renderComponent()
    const container = getByTestId('{{kebabCase name}}-container')
    await act(async () => {
      await userEvent.click(container)
    })
    expect(container).toBeInTheDocument()
  })
})
