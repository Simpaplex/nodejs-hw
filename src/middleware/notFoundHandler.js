export function notFoundHandler(req, res) {
  res.status(404);
  res.json({
    message: 'Route not found',
  });
}
