import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tv, { TvProps } from './Tv'

/* Mock api, hooks, helpers, trackers etc.
jest.mock('@api/[...]'); */

/* remock mocks
(myFuncMock as jest.Mock).mockResolvedValueOnce({
  data: { ...newData },
});

(myFuncMock as jest.Mock).mockImplementationOnce(() => {
    throw new Error();
  }); */

describe.skip('Tv', () => {
  const desktopWidth = 1500
  const propsWithData = {
    //Add default props here
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: TvProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Tv {...props} />
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
  it('Acts with act.', async () => {
    expect.assertions(1)
    const { getByRole, getByTestId } = renderComponent()
    const container = getByTestId('tv-container')
    await act(async () => {
      await userEvent.click(container)
    })
    expect(container).toBeInTheDocument()
  })
})
