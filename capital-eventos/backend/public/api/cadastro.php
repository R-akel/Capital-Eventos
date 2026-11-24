<?php

require_once __DIR__ . '/../../src/database.php';

header('Content-Type: application/json; charset=utf-8');

$origem = $_SERVER['HTTP_ORIGIN'] ?? '';
$origensPermitidas = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
];

if (in_array($origem, $origensPermitidas, true)) {
    header("Access-Control-Allow-Origin: {$origem}");
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

function responder(int $status, array $dados): void
{
    http_response_code($status);
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, ['mensagem' => 'Método não permitido.']);
}

try {
    $dados = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    responder(400, ['mensagem' => 'Envie os dados do cadastro em formato JSON válido.']);
}

if (!is_array($dados)) {
    responder(400, ['mensagem' => 'Dados do cadastro inválidos.']);
}

$nome = trim((string) ($dados['nome'] ?? ''));
$email = strtolower(trim((string) ($dados['email'] ?? '')));
$senha = (string) ($dados['senha'] ?? '');
$quantidadeCaracteresNome = preg_match_all('/./us', $nome);

if ($quantidadeCaracteresNome === false || $quantidadeCaracteresNome < 3 || $quantidadeCaracteresNome > 120) {
    responder(422, ['mensagem' => 'O nome deve ter entre 3 e 120 caracteres.']);
}

if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responder(422, ['mensagem' => 'Informe um e-mail válido.']);
}

if (strlen($senha) < 6 || strlen($senha) > 72) {
    responder(422, ['mensagem' => 'A senha deve ter entre 6 e 72 bytes.']);
}

try {
    $pdo = conectarBanco();
    $consulta = $pdo->prepare(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES (:nome, :email, :senha_hash)'
    );
    $consulta->execute([
        ':nome' => $nome,
        ':email' => $email,
        ':senha_hash' => password_hash($senha, PASSWORD_DEFAULT),
    ]);
} catch (PDOException $erro) {
    if ($erro->getCode() === '23000') {
        responder(409, ['mensagem' => 'Este e-mail já está cadastrado.']);
    }

    error_log($erro->getMessage());
    responder(500, ['mensagem' => 'Não foi possível salvar o cadastro. Verifique a conexão com o banco de dados.']);
}

responder(201, [
    'mensagem' => 'Cadastro realizado com sucesso.',
    'usuario' => ['nome' => $nome],
]);
