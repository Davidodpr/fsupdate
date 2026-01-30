type AnswerData = {
  type: string
  value: [string] | string | React.ReactNode
}

export const AnswerTemplate = (answer: AnswerData) => {
  if (answer.type === 'text') {
    return (
      <div>
        <div className="h-auto font-normal text-base leading-[120%] flex items-start tracking-[0.02em] text-[var(--color-text-main)] flex-none order-0 grow z-[10000] md:w-[700px] [&_a]:text-[var(--color-primary-main)] [&_a]:no-underline [&_a]:font-bold">
          {answer.value}
        </div>
      </div>
    )
  } else if (answer.type === 'bullets') {
    const answers = answer.value as Array<string>
    return (
      <div>
        <div className="h-auto font-normal text-base leading-[120%] flex items-start tracking-[0.02em] text-[var(--color-text-main)] flex-none order-0 grow z-[10000] md:w-[700px] [&_a]:text-[var(--color-primary-main)] [&_a]:no-underline [&_a]:font-bold">
          <ul className="flex flex-col flex-wrap text-[var(--color-text-main)]">
            {answers.map((data, index) => (
              <li key={index} className="py-[5px] md:w-[700px]">
                {data}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else if (answer.type === 'prismic') {
    return (
      <div className="h-auto font-normal text-base leading-[120%] flex items-start tracking-[0.02em] text-[var(--color-text-main)] flex-none order-0 grow z-[10000] md:w-[700px] [&_a]:text-[var(--color-primary-main)] [&_a]:no-underline [&_a]:font-bold">
        {answer.value}
      </div>
    )
  } else {
    return ''
  }
}
