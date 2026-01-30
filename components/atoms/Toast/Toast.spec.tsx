import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import Check from '@/public/images/Check.svg'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Toast, ToastProvider, ToastTitle, ToastDescription } from './Toast'

/* Mock api, hooks, helpers, trackers etc.
jest.mock('@api/[...]'); */

/* remock mocks
(myFuncMock as jest.Mock).mockResolvedValueOnce({
  data: { ...newData },
});

(myFuncMock as jest.Mock).mockImplementationOnce(() => {
    throw new Error();
  }); */

describe('Toast', () => {
  const desktopWidth = 1500
  const renderComponent = (simulatedWidth = desktopWidth) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <ToastProvider>
          <div>Test</div>
          <Toast duration={3000} open={true}>
            <ToastTitle>{<Check />}</ToastTitle>
            <ToastDescription>{'Aktivitet tillagd i checklistan'}</ToastDescription>
          </Toast>
        </ToastProvider>
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
