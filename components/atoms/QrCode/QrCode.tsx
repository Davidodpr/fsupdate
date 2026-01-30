import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { QRCodeSVG } from '@akamfoad/qrcode'

interface QrCodeProps {
  url: string
  withParentSize?: boolean
}

const QrCode = ({ url, withParentSize }: QrCodeProps) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    const getDataUrl = async () => {
      if (typeof window !== undefined) {
        if (window?.document) {
          const qrCanvas = new QRCodeSVG(url, { fgColor: '#000000' })
          const dataUrlWithQRCode = await qrCanvas.toDataUrl()
          if (dataUrlWithQRCode) {
            setDataUrl(dataUrlWithQRCode?.toString())
          }
        }
      }
    }
    getDataUrl()
  }, [url])

  return (
    <div className={clsx('flex items-end', withParentSize && 'h-full w-full')}>
      <div className="relative mx-auto flex h-full w-full">
        {dataUrl && !withParentSize && <Image src={dataUrl.toString()} alt="QR code" width={160} height={160} sizes="100vh" />}
        {dataUrl && withParentSize && <Image src={dataUrl.toString()} alt="QR code" fill sizes="100vh" />}
      </div>
    </div>
  )
}

export default QrCode
