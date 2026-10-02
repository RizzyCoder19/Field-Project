$pptxPath = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx"
$outputDir = "C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\qc_renders"

Write-Host "Checking pptx file: $pptxPath"
if (-not (Test-Path $pptxPath)) {
    Write-Error "File not found: $pptxPath"
    exit 1
}

if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Force -Path $outputDir | Out-Null
}

$pptApp = $null
$presentation = $null

try {
    $pptApp = New-Object -ComObject PowerPoint.Application
    # PowerPoint requires Window to be visible or at least default window state
    $presentation = $pptApp.Presentations.Open($pptxPath)
    $slideCount = $presentation.Slides.Count
    Write-Host "Successfully opened presentation. Slide count: $slideCount"

    for ($i = 1; $i -le $slideCount; $i++) {
        $slide = $presentation.Slides.Item($i)
        $idxStr = $i.ToString("D2")
        $exportPath = Join-Path $outputDir "slide_$idxStr.png"
        
        # Slide export to PNG (1920x1080)
        $slide.Export($exportPath, "PNG", 1920, 1080)
        Write-Host "Exported slide $i to: $exportPath"
    }
    Write-Host "COMPLETE: All $slideCount slides exported to PNG!"
}
catch {
    Write-Error "PowerPoint COM Exception: $_"
}
finally {
    if ($presentation) {
        $presentation.Close()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation) | Out-Null
    }
    if ($pptApp) {
        $pptApp.Quit()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pptApp) | Out-Null
    }
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}
