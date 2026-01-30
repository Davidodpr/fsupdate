/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface mockProps {
  alt?: string
  height?: number | string
  width?: number | string
  src?: string
  'data-testid'?: string
}

const mock = (props: mockProps) => {
  const { alt, height, width, src } = props
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <img
        style={{
          position: 'absolute',
          minWidth: '100%',
          minHeight: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        alt={alt || 'Image'}
        height={height || 25}
        width={width || 25}
        src={src || 'url'}
        data-testid={props['data-testid']}
      />
    </div>
  )
}

export default mock
