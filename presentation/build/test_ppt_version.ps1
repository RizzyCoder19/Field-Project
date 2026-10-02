try {
    $ppt = New-Object -ComObject PowerPoint.Application
    Write-Host "PPT Version:" $ppt.Version
    Write-Host "PPT Build:" $ppt.Build
    $ppt.Quit()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
} catch {
    Write-Host "Error:" $_
}
