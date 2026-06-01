param(
  [string]$ProjectName = "",
  [switch]$Production = $true
)

$env = if ($Production) { "production" } else { "preview" }

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Setup Environment Variables Vercel" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

if (-not $ProjectName) {
  $ProjectName = Read-Host "Nama project di Vercel (biarkan kosong jika sudah terhubung)"
}

Write-Host ""
Write-Host "Masukkan nilai untuk setiap variable." -ForegroundColor Yellow
Write-Host "Kosongkan + Enter untuk skip variable." -ForegroundColor Yellow
Write-Host ""

# ─── Variable definitions ───
$vars = @(
  @{
    Name = "NEXT_PUBLIC_SITE_URL"
    Type = "plain"
    Prompt = "Domain production (contoh: https://sekolah-anda.vercel.app)"
    Default = "https://sekolah-anda.vercel.app"
  }
  @{
    Name = "NEXT_PUBLIC_SUPABASE_URL"
    Type = "plain"
    Prompt = "Supabase Project URL (Settings > API > Project URL)"
    Default = ""
  }
  @{
    Name = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    Type = "plain"
    Prompt = "Supabase anon public key (Settings > API > anon public)"
    Default = ""
  }
  @{
    Name = "DATABASE_PROVIDER"
    Type = "plain"
    Prompt = "Provider database"
    Default = "supabase"
  }
  @{
    Name = "SESSION_SECRET"
    Type = "secret"
    Prompt = "Session secret (min 32 karakter)"
    Default = $(node -e "const c=require('crypto'); console.log(c.randomBytes(32).toString('hex'))" 2>$null)
  }
  @{
    Name = "ADMIN_EMAIL"
    Type = "plain"
    Prompt = "Email untuk login admin"
    Default = "admin@sekolah.sch.id"
  }
  @{
    Name = "ADMIN_PASSWORD"
    Type = "secret"
    Prompt = "Password untuk login admin (min 8 karakter)"
    Default = ""
  }
)

$values = @{}

# ─── Collect values ───
foreach ($v in $vars) {
  $defaultMsg = if ($v.Default) { " [$($v.Default)]" } else { "" }
  $input = Read-Host "$($v.Prompt)$($defaultMsg)"
  
  if ([string]::IsNullOrEmpty($input) -and $v.Default) {
    $values[$v.Name] = $v.Default
  }
  elseif (-not [string]::IsNullOrEmpty($input)) {
    $values[$v.Name] = $input
  }
  else {
    Write-Host "  >> SKIP $($v.Name)" -ForegroundColor DarkGray
  }
}

# ─── Confirm ───
Write-Host ""
Write-Host "Variables yang akan di-set:" -ForegroundColor Cyan
foreach ($kv in $values.GetEnumerator()) {
  $masked = if ($kv.Key -match "SECRET|PASSWORD|KEY") { "...$($kv.Value.Substring([Math]::Max(0,$kv.Value.Length-6)))" } else { $kv.Value }
  Write-Host "  $($kv.Key) = $masked" -ForegroundColor White
}
Write-Host ""

$confirm = Read-Host "Lanjutkan? (Y/n)"
if ($confirm -ne "" -and $confirm -ne "Y" -and $confirm -ne "y") {
  Write-Host "Dibatalkan." -ForegroundColor Red
  exit 1
}

# ─── Set via Vercel CLI ───
Write-Host ""
Write-Host "Menjalankan Vercel CLI..." -ForegroundColor Green

foreach ($kv in $values.GetEnumerator()) {
  $name = $kv.Key
  $value = $kv.Value
  $type = ($vars | Where-Object { $_.Name -eq $name }).Type
  $typeFlag = if ($type -eq "secret") { "" } else { "--plain" }

  if ($ProjectName) {
    $cmd = "`"$value`" | vercel env add $typeFlag $name $env --project $ProjectName"
  } else {
    $cmd = "`"$value`" | vercel env add $typeFlag $name $env"
  }

  Write-Host "  [$($name)] setting..." -NoNewline -ForegroundColor Gray
  try {
    $result = Invoke-Expression $cmd 2>&1 | Out-String
    if ($LASTEXITCODE -eq 0) {
      Write-Host " OK" -ForegroundColor Green
    } else {
      Write-Host " ERROR" -ForegroundColor Red
      Write-Host $result -ForegroundColor Red
    }
  } catch {
    Write-Host " ERROR" -ForegroundColor Red
    Write-Host $_ -ForegroundColor Red
  }
}

Write-Host ""
Write-Host "Selesai!" -ForegroundColor Green
Write-Host ""
Write-Host "Langkah selanjutnya:" -ForegroundColor Yellow
Write-Host "  1. vercel deploy --prod" -ForegroundColor White
Write-Host "  2. Buka domain Vercel dan verifikasi" -ForegroundColor White
