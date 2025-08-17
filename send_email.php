<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $body = trim($_POST["body"]);

    // Il tuo indirizzo email
    $recipient = "blackskull.k.info@gmail.com";

    // Costruisci il messaggio email
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n";
    $email_content .= "Message:\n$body\n";

    // Costruisci le intestazioni dell'email
    $email_headers = "From: $name <$email>";

    // Invia l'email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Reindirizza a una pagina di successo
        header("Location: /success.html");
    } else {
        // Reindirizza a una pagina di errore
        header("Location: /error.html");
    }
} else {
    // Non è una richiesta POST, reindirizza
    header("Location: /contacts.html");
}
?>
