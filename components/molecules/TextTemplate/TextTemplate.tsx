import { textTemplateWrapperVariants, textWrapperVariants, linkWrapperVariants, bulletTextListVariants, bulletTextListItemVariants } from './TextTemplate.variants'

type LinkItem = {
  url: string
  text: string
}

export type TextItem = {
  type: string
  value: string | [string] | React.ReactNode | LinkItem
}

interface TextTemplateProps {
  text: TextItem[]
}

export const TextTemplate = ({ text: text }: TextTemplateProps) => {
  return (
    <div className={textTemplateWrapperVariants()}>
      {text && Array.isArray(text)
        ? text.map((textItem, index) =>
            textItem.type === 'text' ? (
              <div key={`AnswerText-${index}`} className={textWrapperVariants({ paddingOn: true })}>
                {textItem.value as string}
              </div>
            ) : textItem.type === 'bullets' ? (
              <TextBullets key={`bullets-${index}`} TextBullets={textItem.value as string[]} />
            ) : textItem.type === 'link' ? (
              <div key={`answerLink-${index}`} className={textWrapperVariants({ paddingOn: true })}>
                <TextLink textLink={textItem.value as LinkItem} />
              </div>
            ) : textItem.type === 'text-italic' ? (
              <div key={`AnswerText-${index}`} className={textWrapperVariants()}>
                {textItem.value as string}
              </div>
            ) : (
              ''
            ),
          )
        : null}
    </div>
  )
}

interface TextBUlletsProps {
  TextBullets: string[]
}

const TextBullets = ({ TextBullets: textBullets }: TextBUlletsProps) => {
  return (
    <div>
      <div className={textWrapperVariants()}>
        <ul className={bulletTextListVariants()}>
          {textBullets.map((data, index, key) => (
            <li key={`bulletpoints-${index}-${key}`} className={bulletTextListItemVariants()}>
              <div className={textWrapperVariants()}>{data} </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

interface TextLinkProps {
  textLink: LinkItem
}

const TextLink = ({ textLink: textLink }: TextLinkProps) => {
  return (
    <a href={textLink.url} target="_blank" rel="noopener noreferrer" className={linkWrapperVariants()}>
      {textLink.text}
    </a>
  )
}
