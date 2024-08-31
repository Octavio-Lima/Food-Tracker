Set WshShell = CreateObject("WScript.Shell") 
WshShell.Run chr(34) & "D:\GitHub\food-tracker\start_server.bat" & Chr(34), 0
Set WshShell = Nothing