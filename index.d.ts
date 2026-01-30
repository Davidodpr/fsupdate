// https://stackoverflow.com/a/68129058 -- how-to-override-next-js-svg-module-declaration

type StaticImageData = {
  src: string
  height: number
  width: number
  placeholder?: string
}

declare module '*.png' {
  const content: StaticImageData
  export default content
}

declare module '*.svg' {
  // Alt is not a default property on SVG elements
  const content: React.FC<React.SVGProps<SVGSVGElement> & { alt?: string }>
  export default content
}

declare module '*.ico' {
  const content: StaticImageData
  export default content
}
