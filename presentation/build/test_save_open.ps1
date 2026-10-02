$ppt = New-Object -ComObject PowerPoint.Application
try {
    $tempFile = Join-Path $env:TEMP "com_test.pptx"
    $pres = $ppt.Presentations.Add(-1)
    $slide = $pres.Slides.Add(1, 12)
    $pres.SaveAs($tempFile)
    $pres.Close()
    Write-Host "Saved COM presentation to $tempFile"

    # Now try to open it
    $pres2 = $ppt.Presentations.Open($tempFile)
    Write-Host "Re-opened COM presentation successfully! Slides: " $pres2.Slides.Count
    $pres2.Close()
} catch {
    Write-Host "Error:" $_
} finally {
    $ppt.Quit()
}
