Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip='logs_sanctuary.zip'
$z=[System.IO.Compression.ZipFile]::OpenRead($zip)
$entries=$z.Entries | Where-Object { $_.FullName -like 'LogFiles/*2025_11_10*docker.log' } | Sort-Object FullName
if (-not $entries) { Write-Host 'No matching entries'; exit }
foreach ($e in $entries) {
    Write-Host "--- $($e.FullName) ---"
    $s=$e.Open()
    $sr=New-Object System.IO.StreamReader($s)
    $content=$sr.ReadToEnd()
    $lines=$content -split "`n"
    $start=[Math]::Max(0,$lines.Length-200)
    $out=$lines[$start..($lines.Length-1)] -join "`n"
    Write-Host $out
    Write-Host "`n"
}
$z.Dispose()
