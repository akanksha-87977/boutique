param(
    [string]$RepoFull, # format: username/repo
    [string]$Visibility = 'public',
    [string]$MONGODB_URI = $null,
    [string]$JWT_SECRET = $null
)

if (-not $env:GH_TOKEN) { Write-Host "ERROR: set GH_TOKEN environment variable (GitHub Personal Access Token)"; exit 1 }
if (-not $env:VERCEL_TOKEN) { Write-Host "ERROR: set VERCEL_TOKEN environment variable (Vercel Personal Token)"; exit 1 }

if (-not $RepoFull) { Write-Host "Usage: .\deploy_noninteractive.ps1 -RepoFull username/repo [-MONGODB_URI '...']"; exit 1 }

$parts = $RepoFull -split '/'
if ($parts.Length -ne 2) { Write-Host "Repo must be in format username/repo"; exit 1 }
$owner = $parts[0]; $repo = $parts[1]

$ghToken = $env:GH_TOKEN
$vercelToken = $env:VERCEL_TOKEN

Write-Host "Creating GitHub repo $RepoFull..."
$body = @{ name = $repo; private = ($Visibility -eq 'private') } | ConvertTo-Json
try {
    $resp = Invoke-RestMethod -Method Post -Uri "https://api.github.com/user/repos" -Headers @{ Authorization = "token $ghToken"; "User-Agent" = "deploy-script" } -Body $body -ContentType "application/json"
    Write-Host "GitHub repo created: $($resp.html_url)"
} catch {
    Write-Host "GitHub create failed: $($_.Exception.Message)"
    # continue if repo already exists
}

Write-Host "Adding remote and pushing..."
git remote remove origin 2>$null
git remote add origin "https://github.com/$RepoFull.git"
git branch -M main
git push -u origin main

Write-Host "Deploying to Vercel (non-interactive)..."
$vercelOut = npx vercel --token $vercelToken --prod --confirm 2>&1
Write-Host $vercelOut

# Try to parse URL
if ($vercelOut -match 'https?://[^\s]+') { $url = $Matches[0]; Write-Host "Deployed URL: $url" } else { Write-Host "Could not parse Vercel URL from CLI output." }

Write-Host "`nTo add environment variables to your Vercel project (automatically), follow these steps:`n1) Find your Vercel Project ID by running:`n   npx vercel projects ls --token $vercelToken`n2) Then run the CURL command below (replace <PROJECT_ID> with the ID):`n
if ($MONGODB_URI) {
    $mongoEsc = $MONGODB_URI.Replace('"','\"')
    Write-Host "curl -X POST https://api.vercel.com/v9/projects/<PROJECT_ID>/env -H \"Authorization: Bearer $vercelToken\" -H \"Content-Type: application/json\" -d '{\"key\":\"MONGODB_URI\",\"value\":\"$mongoEsc\",\"target\":[\"production\"]}'"
}
if ($JWT_SECRET) {
    $jwtEsc = $JWT_SECRET.Replace('"','\"')
    Write-Host "curl -X POST https://api.vercel.com/v9/projects/<PROJECT_ID>/env -H \"Authorization: Bearer $vercelToken\" -H \"Content-Type: application/json\" -d '{\"key\":\"JWT_SECRET\",\"value\":\"$jwtEsc\",\"target\":[\"production\"]}'"
}

Write-Host "`nIf you prefer, add variables via Vercel dashboard: Project → Settings → Environment Variables."
