<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$dataDir = __DIR__ . '/data';
$uploadsDir = dirname(__DIR__) . '/uploads';
$stateFile = $dataDir . '/cms_state.json';
$expectedHash = 'a4d10110ce76228ec310a5783716d89336e6a9a6e961c9728d2e0837eb7f3f39';

if (!is_dir($dataDir)) {
  @mkdir($dataDir, 0755, true);
}
if (!is_dir($uploadsDir)) {
  @mkdir($uploadsDir, 0755, true);
}

// GET: Aktuellen CMS-Datenbestand auslesen
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (file_exists($stateFile)) {
    $content = file_get_contents($stateFile);
    echo $content ?: json_encode(['success' => true, 'data' => null]);
  } else {
    echo json_encode(['success' => true, 'data' => null]);
  }
  exit;
}

// POST: Daten speichern oder Datei (PDF / Bild) auf dem Plesk-Server hochladen
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Datei-Upload per multipart/form-data
  if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    if ($file['error'] !== UPLOAD_ERR_OK) {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'Datei-Upload fehlgeschlagen.']);
      exit;
    }
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['pdf', 'webp', 'jpg', 'jpeg', 'png', 'svg'];
    if (!in_array($ext, $allowed, true)) {
      http_response_code(400);
      echo json_encode(['success' => false, 'error' => 'Nicht erlaubter Dateityp.']);
      exit;
    }
    $safeBase = preg_replace('/[^a-zA-Z0-9_-]/', '-', pathinfo($file['name'], PATHINFO_FILENAME));
    $targetName = $safeBase . '-' . time() . '.' . $ext;
    $targetPath = $uploadsDir . '/' . $targetName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
      echo json_encode([
        'success' => true,
        'url' => '/uploads/' . $targetName,
        'fileName' => $targetName
      ]);
    } else {
      http_response_code(500);
      echo json_encode(['success' => false, 'error' => 'Konnte Datei nicht im uploads-Ordner speichern.']);
    }
    exit;
  }

  // JSON-Datenbestand speichern
  $raw = file_get_contents('php://input');
  $decoded = json_decode($raw, true);
  if (!$decoded || !isset($decoded['data'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Ungültige CMS-Daten.']);
    exit;
  }

  $payload = json_encode([
    'success' => true,
    'updatedAt' => date('c'),
    'data' => $decoded['data']
  ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

  if (file_put_contents($stateFile, $payload) !== false) {
    echo json_encode(['success' => true, 'updatedAt' => date('c')]);
  } else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Schreibfehler auf dem Server.']);
  }
  exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
