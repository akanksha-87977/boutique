# deploy.ps1 - Create GitHub repo, push, deploy to Vercel, add env vars (interactive)
Set-StrictMode -Version Latest

function Check-Cmd($name) {
    if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
        Write-Host "`nERROR: '$name' CLI not found. Install it and re-run." -ForegroundColor Yellow
        return $false
    }
    return $true
}

# Check prerequisites
$hasGh = Check-Cmd gh
$hasVercel = (Get-Command vercel -ErrorAction SilentlyContinue) -ne $null
if (-not $hasVercel) { $hasVercel = $true } # we'll use npx if vercel not installed

# Repo info
$repoFull = Read-Host "GitHub repo (format: username/repo)"
if ([string]::IsNullOrWhiteSpace($repoFull)) { Write-Host "Repo name required, exiting."; exit 1 }
$visibility = Read-Host "Visibility (public/private) [public]"
if ($visibility -eq "") { $visibility = "public" }
$ghFlag = if ($visibility -eq "private") { "--private" } else { "--public" }

# Create repo and push (using gh)
if ($hasGh) {
    Write-Host "`nCreating GitHub repo (gh will prompt for auth if needed)..."
    gh repo create $repoFull $ghFlag --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) { Write-Host "gh create failed; check output."; }
} else {
    Write-Host "`n'gh' CLI not available. Please create the repo manually on GitHub, then run:"
    Write-Host "  git remote add origin https://github.com/<your-username>/<your-repo>.git"
    Write-Host "  git branch -M main"
    Write-Host "  git push -u origin main"
    pause
}

# Ensure branch name main
git branch -M main 2>$null

# Prompt for environment secrets
Write-Host "`nEnter environment variables to add to Vercel (leave empty to skip):"
$mongo = Read-Host "MONGODB_URI (MongoDB Atlas connection string)"
$jwt = Read-Host "JWT_SECRET (optional)"
$other = Read-Host "Any other env var in format NAME=VALUE (leave blank to finish)"

# Vercel login and deploy
Write-Host "`nDeploying to Vercel (interactive). You'll be prompted to login if necessary."
# Use npx so it works even without global vercel
npx vercel login

Write-Host "Running initial deploy (this may ask questions about project settings)..."
$deployOutput = npx vercel --prod --confirm 2>&1
Write-Host $deployOutput

# Parse deployed URL from output (best-effort)
if ($deployOutput -match 'https?://[^\s]+' ) {
    $url = $Matches[0]
    Write-Host "`nDetected deployment URL: $url"
} else {
    Write-Host "`nCould not parse deployment URL from output. Check Vercel dashboard or the CLI output above."
}

# Add environment variables to Vercel (interactive)
if ($mongo -ne "") {
    Write-Host "`nAdding MONGODB_URI to Vercel (production). You will be asked to confirm/enter value interactively if needed."
    # Interactive add
    vercel env add MONGODB_URI production 2>$null
    if ($LASTEXITCODE -ne 0) {
        # fallback: interactive prompt
        Write-Host "If the CLI failed to add env var, run interactively:"
        Write-Host "  vercel env add MONGODB_URI production"
    }
    Write-Host "You may need to paste the value when prompted by the CLI."
}

if ($jwt -ne "") {
    Write-Host "`nAdding JWT_SECRET to Vercel (production)."
    vercel env add JWT_SECRET production 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "If the CLI failed to add env var, run:"
        Write-Host "  vercel env add JWT_SECRET production"
    }
}

if ($other -ne "") {
    while ($other -ne "") {
        if ($other -match '^(.*?)=(.*)$') {
            $name = $Matches[1]; $val = $Matches[2]
            Write-Host "Adding $name to Vercel (production)."
            vercel env add $name production 2>$null
            if ($LASTEXITCODE -ne 0) { Write-Host "If failed, run: vercel env add $name production" }
        } else {
            Write-Host "Skipping invalid format: $other"
        }
        $other = Read-Host "Next env var NAME=VALUE (leave blank to finish)"
    }
}

Write-Host "`nDeployment script finished. Verify:"
if ($url) { Write-Host "- Visit: $url/api/health" } else { Write-Host "- Check Vercel dashboard for your project URL" }
Write-Host "- Confirm frontend loads and API endpoints respond."
