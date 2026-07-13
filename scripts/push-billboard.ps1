# Wrapper para el Programador de tareas de Windows.
# Corre el push de la cartelera y deja un log con timestamp para diagnóstico.
# Registrar (una vez, ajusta la hora si quieres):
#   schtasks /Create /TN "CineGlow Billboard" /TR "powershell -NoProfile -ExecutionPolicy Bypass -File \"E:\gravityCine\scripts\push-billboard.ps1\"" /SC DAILY /ST 08:00 /F
# Ejecutar a mano:   schtasks /Run /TN "CineGlow Billboard"
# Borrar:            schtasks /Delete /TN "CineGlow Billboard" /F

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$logDir = Join-Path $repo "scripts\logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
$log = Join-Path $logDir "push-billboard.log"
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

try {
    Set-Location $repo
    "[$stamp] Iniciando push-billboard..." | Add-Content -Path $log -Encoding utf8
    $output = & node "scripts\push-billboard.js" 2>&1
    $output | Add-Content -Path $log -Encoding utf8
    "[$stamp] Fin (exit $LASTEXITCODE)." | Add-Content -Path $log -Encoding utf8
} catch {
    "[$stamp] ERROR: $_" | Add-Content -Path $log -Encoding utf8
    exit 1
}
