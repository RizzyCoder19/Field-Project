$sourcePath = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\Seasonal_Disease_Patterns_Maharashtra_Prototype.pptx"
$tempPath = Join-Path $env:TEMP "prototype_copy.pptx"
Copy-Item -Path $sourcePath -Destination $tempPath -Force

Write-Host "Copied to temp path: $tempPath"
Write-Host "File size: $((Get-Item $tempPath).Length) bytes"

$ppt = $null
$pres = $null
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    # ReadOnly = -1 (msoTrue), Untitled = 0 (msoFalse), WithWindow = -1 (msoTrue)
    $pres = $ppt.Presentations.Open($tempPath, -1, 0, -1)
    Write-Host "SUCCESS! Slides count:" $pres.Slides.Count
    
    $outDir = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\qc_renders"
    if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }
    
    for ($i = 1; $i -le $pres.Slides.Count; $i++) {
        $outImg = Join-Path $outDir ("slide_{0:D2}.png" -f $i)
        $pres.Slides.Item($i).Export($outImg, "PNG", 1920, 1080)
        Write-Host "Exported slide $i -> $outImg"
    }
} catch {
    Write-Host "Error during open/export:" $_.Exception.Message
    Write-Host "HResult:" $_.Exception.HResult
} finally {
    if ($pres) { $pres.Close(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null }
    if ($ppt) { $ppt.Quit(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null }
    [System.GC]::Collect()
}
