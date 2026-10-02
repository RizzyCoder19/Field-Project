$buildDir = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build"
$ppt = New-Object -ComObject PowerPoint.Application

for ($i = 1; $i -le 10; $i++) {
    $idxStr = $i.ToString("D2")
    $filePath = Join-Path $buildDir "test_slide$idxStr.pptx"
    try {
        $pres = $ppt.Presentations.Open($filePath)
        Write-Host ("Slide " + $idxStr + ": SUCCESS (Slides: " + $pres.Slides.Count + ")")
        $pres.Close()
    } catch {
        Write-Host ("Slide " + $idxStr + ": FAILED - " + $_.Exception.Message)
    }
}

$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
