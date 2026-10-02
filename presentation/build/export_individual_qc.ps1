$buildDir = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build"
$outputDir = Join-Path $buildDir "qc_renders"

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$ppt = New-Object -ComObject PowerPoint.Application

for ($i = 1; $i -le 10; $i++) {
    $idxStr = $i.ToString("D2")
    $filePath = Join-Path $buildDir "test_slide$idxStr.pptx"
    $exportPath = Join-Path $outputDir "slide_$idxStr.png"
    try {
        $pres = $ppt.Presentations.Open($filePath)
        $slide = $pres.Slides.Item(1)
        $slide.Export($exportPath, "PNG", 1920, 1080)
        Write-Host "Exported Slide $idxStr to: $exportPath"
        $pres.Close()
    } catch {
        Write-Host "Slide $idxStr Export FAILED: $_"
    }
}

$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
[System.GC]::Collect()
[System.GC]::WaitForPendingFinalizers()
Write-Host "ALL SLIDES EXPORTED TO QC RENDERS!"
