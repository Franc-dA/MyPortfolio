<?php
session_start(); // Inizializza la sessione

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Metodo non consentito']);
    exit;
}

// Verifica se l'utente ha già inviato un'email oggi
if (isset($_SESSION['last_email_sent'])) {
    $lastSentDate = $_SESSION['last_email_sent'];
    $currentDate = date('Y-m-d');

    if ($lastSentDate === $currentDate) {
        http_response_code(400);
        echo json_encode(['error' => 'Hai già inviato una richiesta oggi.']);
        exit;
    }
}

$data = json_decode(file_get_contents('php://input'), true);

// Validazione dei campi obbligatori
$requiredFields = ['name', 'email', 'message', 'captchaToken'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Campi obbligatori mancanti: {$field}"]);
        exit;
    }
}

// Validazione dell'email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Formato email non valido']);
    exit;
}

// Verifica reCAPTCHA
$recaptchaSecret = getenv('RECAPTCHA_SECRET'); 
$captchaToken = $data['captchaToken'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'secret' => $recaptchaSecret,
    'response' => $captchaToken
]);

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore di connessione con il server reCAPTCHA']);
    curl_close($ch);
    exit;
}

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Errore di connessione: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

$responseData = json_decode($response);
curl_close($ch);

if (!$responseData->success) {
    http_response_code(400);
    echo json_encode(['error' => 'reCAPTCHA non valido']);
    exit;
}

// Inclusione PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

try {
    // Configurazione PHPMailer
    $mail = new PHPMailer(true);

    // Debug per diagnosticare problemi
    $mail->SMTPDebug = 0; // Riduci il livello di debug in produzione
    $mail->Debugoutput = 'error_log'; // Salva i log degli errori nel file di log

    // Configurazione del server SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USERNAME'); 
    $mail->Password = getenv('SMTP_PASSWORD'); 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port = 587; 


    // Impostazioni email
    $mail->setFrom('SMTP_USERNAME', 'Francesco D\'Argenio');
    $mail->addAddress($data['email'], $data['name']); // Email del destinatario
    $mail->isHTML(true);
    $mail->Subject = 'Conferma Ricezione Messaggio';
    $mail->Body = "
    <html lang='it'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Email Conferma</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; margin: 0; padding: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #1a1a1a; }
            .confirmation-card { background: #2d2d2d; padding: 2.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); text-align: center; max-width: 400px; width: 90%; }
            .success-header { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
            .success-icon { width: 64px; height: 64px; background: #ff6b00; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
            .logo { width: 64px; height: 64px; }
            .checkmark { color: white; font-size: 2rem; }
            h1 { color: #ffffff; margin: 0 0 1rem; font-size: 1.5rem; }
            p { color: #cccccc; margin: 0 0 1.5rem; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class='confirmation-card'>
            <div class='success-header'>
                <div class='success-icon'>
                    <span class='checkmark'>✓</span>
                </div>
            </div>
            <h1>Email Inviata!</h1>
            <p>Grazie per avermi contattato. Ti risponderò al più presto. </p>
        </div>
    </body>
    </html>

    ";

    // Invia l'email
    $mail->send();

    // Salva la data dell'ultimo invio
    $_SESSION['last_email_sent'] = date('Y-m-d');

    echo json_encode(['success' => true, 'message' => 'Email di conferma inviata']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "Errore nell'invio dell'email: {$mail->ErrorInfo}"]);
}
?>
