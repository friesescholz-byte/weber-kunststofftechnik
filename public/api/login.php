<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true);
$password = isset($body['password']) ? (string)$body['password'] : '';
$turnstileToken = isset($body['cf-turnstile-response']) ? (string)$body['cf-turnstile-response'] : (isset($body['turnstileToken']) ? (string)$body['turnstileToken'] : '');

// Optional server-side Turnstile verification if TURNSTILE_SECRET_KEY is configured in Plesk env
$turnstileSecret = getenv('TURNSTILE_SECRET_KEY');
if ($turnstileSecret && !empty($turnstileToken)) {
  $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'secret' => $turnstileSecret,
    'response' => $turnstileToken
  ]));
  $verifyResp = curl_exec($ch);
  curl_close($ch);
  if ($verifyResp) {
    $verifyData = json_decode($verifyResp, true);
    if (empty($verifyData['success'])) {
      http_response_code(403);
      echo json_encode(['success' => false, 'error' => 'Turnstile-Sicherheitsprüfung fehlgeschlagen.']);
      exit;
    }
  }
}

// Kryptografischer SHA-256 Vergleich (kein Klartext-Passwort im Quellcode)
$expectedHash = 'a4d10110ce76228ec310a5783716d89336e6a9a6e961c9728d2e0837eb7f3f39';
$envPassword = getenv('ADMIN_PASSWORD') ?: getenv('Passwort');

$inputHash = hash('sha256', $password);
$isValid = false;

if ($envPassword && hash_equals($envPassword, $password)) {
  $isValid = true;
} elseif (hash_equals($expectedHash, $inputHash)) {
  $isValid = true;
}

if ($isValid) {
  $sessionToken = hash_hmac('sha256', 'weber_admin_' . date('Y-m-d'), $expectedHash);
  echo json_encode([
    'success' => true,
    'token' => $sessionToken
  ]);
} else {
  http_response_code(401);
  echo json_encode([
    'success' => false,
    'error' => 'Ungültiges Admin-Passwort.'
  ]);
}
