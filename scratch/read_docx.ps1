Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead('Field_Project_Report_Draft_Seasonal_Disease_Patterns.docx')
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$text = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$clean = [System.Text.RegularExpressions.Regex]::Replace($text, '<[^>]+>', ' ')
$clean = [System.Text.RegularExpressions.Regex]::Replace($clean, '\s+', ' ')
[System.IO.File]::WriteAllText('scratch/docx_extracted.txt', $clean)
Write-Output "Extracted length: $($clean.Length)"
