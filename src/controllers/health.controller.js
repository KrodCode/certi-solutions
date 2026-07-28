export function getHealthStatus(_request, response) {
  response.status(200).json({
    status: 'ok',
    service: 'certi-solutions',
    message: 'El servicio se encuentra operativo.',
    timestamp: new Date().toISOString(),
  });
}
