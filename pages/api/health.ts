export default function handler(req, res) {
  res.status(200).json({ status: 'Sanctuary is alive', timestamp: new Date().toISOString() })
}
