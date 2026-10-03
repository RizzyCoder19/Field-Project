 = 'C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\Seasonal_Disease_Patterns_Maharashtra_FINAL.pptx'
 = 'C:\Users\ADMIN\OneDrive\Desktop\Field Project\presentation\build\Seasonal_Disease_Patterns_Maharashtra_FINAL.pdf'

Write-Host 'Target PPTX:' 
Write-Host 'Target PDF :' 

if (-not (Test-Path )) {
    Write-Error 'PPTX file does not exist.'
    exit 1
}

 = 
 = 

try {
     = New-Object -ComObject PowerPoint.Application
    # Open presentation (ReadOnly, Untitled, WithWindow)
     = .Presentations.Open(, [Microsoft.Office.Core.MsoTriState]::msoTrue, [Microsoft.Office.Core.MsoTriState]::msoFalse, [Microsoft.Office.Core.MsoTriState]::msoFalse)
    
    # 32 = ppSaveAsPDF
    .SaveAs(, 32)
    Write-Host 'Successfully exported to PDF via SaveAs!'
}
catch {
    Write-Warning 'SaveAs failed, trying ExportAsFixedFormat...'
    try {
        # ExportAsFixedFormat(Path, FixedFormatType, Intent, FrameSlides, HandoutOrder, OutputType, PrintHiddenSlides, PrintRange, RangeType, SlideShowName, IncludeDocProps, KeepIRMSettings, DocStructureTags, BitmapMissingFonts, UseISO19005_1)
        # ppFixedFormatTypePDF = 2
        .ExportAsFixedFormat(, 2)
        Write-Host 'Successfully exported to PDF via ExportAsFixedFormat!'
    }
    catch {
        Write-Error ('COM Export failed: ' + .Exception.Message)
        exit 1
    }
}
finally {
    if () {
        .Close()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject() | Out-Null
    }
    if () {
        .Quit()
        [System.Runtime.InteropServices.Marshal]::ReleaseComObject() | Out-Null
    }
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
}

if (Test-Path ) {
     = Get-Item 
    Write-Host ('PDF created successfully! Size: ' + .Length + ' bytes')
} else {
    Write-Error 'PDF was not created.'
    exit 1
}
