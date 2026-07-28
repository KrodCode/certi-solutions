export function requireJsonContentType(
  request,
  response,
  next,
) {
  if (!request.is('application/json')) {
    return response.status(415).json({
      status: 'error',
      error: {
        code: 'UNSUPPORTED_MEDIA_TYPE',
        message:
          'La solicitud debe utilizar Content-Type application/json.',
      },
    });
  }

  return next();
}

export function disableApiCaching(
  _request,
  response,
  next,
) {
  response.set({
    'Cache-Control': 'no-store, max-age=0',
    Pragma: 'no-cache',
  });

  next();
}
