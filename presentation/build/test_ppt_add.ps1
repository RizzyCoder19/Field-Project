$ppt = New-Object -ComObject PowerPoint.Application
try {
    $pres = $ppt.Presentations.Add(-1) # WithWindow = msoTrue
    Write-Host "Created new presentation! Slides:" $pres.Slides.Count
    $slide = $pres.Slides.Add(1, 12) # ppLayoutBlank = 12
    Write-Host "Added slide! Count:" $pres.Slides.Count
    $pres.Close()
} catch {
    Write-Host "Error creating presentation:" $_
} finally {
    $ppt.Quit()
}
