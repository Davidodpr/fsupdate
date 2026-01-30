import config from 'evidentlyConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Evidently } from '@aws-sdk/client-evidently'
import { LazyJsonString } from '@aws-sdk/smithy-client'

type EvidentlyResponse = {
  $metadata: {
    attempts?: number
    cfId?: string
    extendedRequestId?: string
    httpStatusCode?: number
    requestId?: string
    totalRetryDelay?: number
  }
  details?: string | LazyJsonString
  reason?: string
  value?: {
    stringValue?: string
  }
  variation?: string
}

const evaluateEvidentlyFeature = async (req: NextApiRequest, res: NextApiResponse<EvidentlyResponse>) => {
  const client = new Evidently({ region: config.evidently.REGION, credentials: config.credential })
  const { body } = req
  const data = await client.evaluateFeature(body)
  if (data.$metadata.httpStatusCode !== 200) {
    res.status(500)
  } else res.status(200).json(data)
}

export default evaluateEvidentlyFeature
