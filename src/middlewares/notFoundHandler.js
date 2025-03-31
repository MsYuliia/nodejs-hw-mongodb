export default function notFoundHandler(_, res) {
  res.status(404).json({ message: 'Route not found' });
}
