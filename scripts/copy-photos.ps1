param(
  [string]$SourceBase = "C:\Users\campb\Downloads",
  [string]$ProjectRoot = "$PSScriptRoot\..",
  [int]$Count = 18
)

$ErrorActionPreference = "Stop"

$DestBase = Join-Path $ProjectRoot "public\images"

$map = @{
  "weddings"  = "heyday_weddings"
  "corporate" = "heyday_corporate"
  "private"   = "heyday_private"
  "daily"     = "heyday_daily"
}

# Ensure directories
@(
  "hero",
  "services",
  "gallery\weddings",
  "gallery\corporate",
  "gallery\private",
  "gallery\daily"
) | ForEach-Object { New-Item -ItemType Directory -Path (Join-Path $DestBase $_) -Force | Out-Null }

function Copy-Category {
  param([string]$cat, [string]$folder)

  $srcDir = Join-Path $SourceBase $folder
  if (-not (Test-Path $srcDir)) {
    Write-Warning "Missing source: $srcDir"
    return
  }

  $files = Get-ChildItem -Path (Join-Path $srcDir "*.jpg") | Sort-Object Name
  if ($files.Count -eq 0) {
    Write-Warning "No JPGs in $srcDir"
    return
  }

  # Gallery set: first N for stable output
  $gallery = $files | Select-Object -First $Count
  $i = 1
  foreach ($f in $gallery) {
    $newName = "{0}-{1:D3}.jpg" -f $cat, $i
    $dest = Join-Path $DestBase ("gallery\{0}\{1}" -f $cat, $newName)
    Copy-Item $f.FullName -Destination $dest -Force
    $i++
  }

  # Hero = newest by filename; filenames expected by code: home.jpg, weddings.jpg, corporate.jpg, private.jpg, daily.jpg
  $hero = $files[-1]
  $heroDest = Join-Path $DestBase ("hero\{0}.jpg" -f $cat)
  Copy-Item $hero.FullName -Destination $heroDest -Force

  # Service card = second newest (or newest if only one)
  $service = if ($files.Count -ge 2) { $files[-2] } else { $files[-1] }
  $serviceDest = Join-Path $DestBase ("services\{0}.jpg" -f $cat)
  Copy-Item $service.FullName -Destination $serviceDest -Force

  Write-Host ("{0}: copied {1} gallery images; hero={2}; service={3}" -f $cat, ($gallery.Count), $hero.Name, $service.Name)
}

$map.GetEnumerator() | ForEach-Object { Copy-Category -cat $_.Key -folder $_.Value }

# Home hero = weddings hero
$weddingsHero = Join-Path $DestBase "hero\weddings.jpg"
if (Test-Path $weddingsHero) {
  Copy-Item $weddingsHero -Destination (Join-Path $DestBase "hero\home.jpg") -Force
}

Write-Host "Done copying photos."
