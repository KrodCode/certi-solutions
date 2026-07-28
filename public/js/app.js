const statusElement = document.querySelector('#service-status');

async function checkServiceStatus() {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('El servidor respondió con un error.');
    }

    const result = await response.json();

    statusElement.textContent = result.message;
    statusElement.classList.remove('status-error');
    statusElement.classList.add('status-ok');
  } catch {
    statusElement.textContent =
      'No fue posible establecer conexión con el servidor.';

    statusElement.classList.remove('status-ok');
    statusElement.classList.add('status-error');
  }
}

checkServiceStatus();
