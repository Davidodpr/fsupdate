import config from 'evidentlyConfig'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Evidently, PutProjectEventsCommand, Event } from '@aws-sdk/client-evidently'

const sendEvidentlyEvent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new Evidently({ region: config.evidently.REGION, credentials: config.credential })
    const { body } = req

    const input = {
      project: body.currentProject as string,
      events: [
        {
          timestamp: new Date(),
          type: 'aws.evidently.custom',
          data: JSON.stringify({
            details: {
              entityId: body.evidentlyId,
              ...body.detailsData,
            },
            userDetails: {
              userId: body.evidentlyId,
            },
          }),
        },
      ] as Event[],
    }

    const command = new PutProjectEventsCommand(input)
    const response = await client.send(command)
    const success = response.$metadata.httpStatusCode === 200
    res.status(success ? 200 : 500).json({ success })
  } catch (e: unknown) {
    res.status(500).json({ success: false })
  } finally {
    res.end()
  }
}

export default sendEvidentlyEvent
