$sourcePath = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\minimal.pptx"

$ppt = $null
$pres = $null
try {
    $ppt = New-Object -ComObject PowerPoint.Application
    $pres = $ppt.Presentations.Open($sourcePath)
    Write-Host "SUCCESS! Slides count in minimal.pptx:" $pres.Slides.Count
} catch {
    Write-Host "Error opening minimal.pptx:" $_.Exception.Message
} finally {
    if ($pres) { $pres.Close(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null }
    if ($ppt) { $ppt.Quit(); [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null }
    [System.GC]::Collect()
}
