import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Checkmark, { CheckmarkProps } from './Checkmark'

/* Mock api, hooks, helpers, trackers etc.
jest.mock('@api/[...]'); */

/* remock mocks
(myFuncMock as jest.Mock).mockResolvedValueOnce({
  data: { ...newData },
});

(myFuncMock as jest.Mock).mockImplementationOnce(() => {
    throw new Error();
  }); */

describe('Checkmark', () => {
  const desktopWidth = 1500
  const propsWithData = {
    //Add default props here
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: CheckmarkProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Checkmark {...props} />
      </ResponsiveContext.Provider>,
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
})
