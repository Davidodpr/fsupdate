import React, { ReactElement, useState } from 'react'
import { DropdownProps, useNavigation } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { clsx } from 'clsx'

const CustomDropdown = (props: DropdownProps) => {
  const { goToMonth, currentMonth } = useNavigation()
  const [openOptions, setOpenOptions] = useState(false)

  if (props.name === 'months' && props?.caption) {
    const result = props?.caption?.toString()?.charAt(0).toUpperCase() + props?.caption?.toString()?.slice(1)
    return (
      <div onClick={() => setOpenOptions(!openOptions)} className="rdp-caption_label">
        {result}
      </div>
    )
  }

  type DropdownOption = {
    $$typeof: ReactElement
    key: string
    props: { value: number; children: string }
    ref: null
    type: string
  }
  const options = [...(props.children as DropdownOption[])]
  return (
    <div className="relative">
      <div className="rdp-dropdown_year relative inline-flex items-center justify-center cursor-pointer">
        <span className="rdp-vhidden">Year: </span>
        <select
          name="years"
          aria-label="Year: "
          onClick={() => setOpenOptions(!openOptions)}
          className="rdp-dropdown opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
        />
        <div className="rdp-caption_label flex items-center" aria-hidden="true">
          {props.value}
          <svg
            width="10px"
            height="10px"
            viewBox="0 0 120 120"
            data-testid="iconDropdown"
            className={clsx('rdp-dropdown_icon transition-transform !ml-2', openOptions ? 'rotate-180' : '')}
            style={{ pointerEvents: 'none' }}
          >
            <path
              d="M4.22182541,48.2218254 C8.44222828,44.0014225 15.2388494,43.9273804 19.5496459,47.9996989 L19.7781746,48.2218254 L60,88.443 L100.221825,48.2218254 C104.442228,44.0014225 111.238849,43.9273804 115.549646,47.9996989 L115.778175,48.2218254 C119.998577,52.4422283 120.07262,59.2388494 116.000301,63.5496459 L115.778175,63.7781746 L67.7781746,111.778175 C63.5577717,115.998577 56.7611506,116.07262 52.4503541,112.000301 L52.2218254,111.778175 L4.22182541,63.7781746 C-0.0739418023,59.4824074 -0.0739418023,52.5175926 4.22182541,48.2218254 Z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </div>
      <div
        className={clsx(
          'absolute top-full left-0 z-50 bg-white shadow-[0px_4px_32px_0px_rgba(0,0,0,0.15)] border border-[#eeeef0] rounded-md max-h-60 overflow-y-auto mt-1 min-w-[80px]',
          openOptions ? 'block' : 'hidden',
        )}
      >
        {options?.map((option: DropdownOption) => (
          <div
            key={option.key}
            className={clsx(
              'px-3 py-2 cursor-pointer transition-colors text-sm !font-bold',
              option.props.value === currentMonth.getFullYear() ? 'bg-[#51c8b4] !text-white hover:bg-[#3fb5a0]' : '!text-[#214766] hover:bg-[#f2f2ef]',
            )}
            onClick={() => {
              goToMonth(new Date(option.props.value, currentMonth.getMonth(), 1))
              setOpenOptions(!openOptions)
            }}
          >
            {option.props.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomDropdown
