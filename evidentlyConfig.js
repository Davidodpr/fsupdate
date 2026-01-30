export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  evidently: {
    REGION: 'eu-central-1',
    ENDPOINT: 'https://evidently.eu-central-1.amazonaws.com',
  },
  credential: {
    accessKeyId: process.env.EVIDENTLY_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.EVIDENTLY_SECRET_ACCESS_KEY || '',
  },
}
