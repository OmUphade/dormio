# BOOTSTRAP — one-time setup (about 30 minutes, you do this once)

After this, you only paste prompts from `docs/PROMPTS.md` into Antigravity and approve what it asks.

## 0. What you need installed
Git · Node.js LTS · pnpm (`corepack enable`) · Docker Desktop · Python 3 · [uv](https://docs.astral.sh/uv/) · Google Antigravity · a GitHub account.

## 1. Create the repository
1. Copy this whole `dormio/` folder to where you keep projects.
2. Create an **empty GitHub repo** named `dormio` (public gives you free CodeRabbit and free CI minutes; private is fine too).
3. In the folder:
```bash
git init && git add . && git commit -m "chore: starter kit" 
git branch -M main
git remote add origin https://github.com/<you>/dormio.git
git push -u origin main
```

## 2. Install the AI tools (run from the repo root, in this order)
```bash
# Get Shit Done (spec-driven workflow)
npx @opengsd/get-shit-done-redux@latest

# UI UX Pro Max (design intelligence) — needs Python 3
npm install -g ui-ux-pro-max-cli
uipro init --ai antigravity

# Graphify (codebase knowledge graph)
uv tool install graphifyy        # if "graphify: command not found" → run: uv tool update-shell, then open a new terminal
graphify install
graphify antigravity install
```
Tool sources: UI UX Pro Max https://github.com/nextlevelbuilder/ui-ux-pro-max-skill · Graphify https://github.com/Graphify-Labs/graphify

**Check nothing was overwritten:** run `git status` and `git diff`. If any installer replaced or trimmed `AGENTS.md`, `.agents/rules/core.md`, `.agents/rules/ui-quality.md` or `.agents/rules/security.md`, restore them with `git checkout -- <file>` (keep the tools' new files). Then commit.

**Verify UI UX Pro Max works:**
```bash
ls .agents/skills/
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "marketplace housing" --domain style
```
If the skill folder is somewhere else, tell the agent the real path (the prompts say to check). If it does not work at all, fix it before building any UI. This is the most important setup step.

## 3. Open in Antigravity and set rules
1. Open the folder in Antigravity.
2. In the Rules/Customizations area make `core`, `ui-quality` and `security` **Always On** (the files are in `.agents/rules/`). Workflows in `.agents/workflows/` appear as `/next-task`, `/build-ui`, etc. (exact menu names can differ by version).
3. Add two MCP servers from Antigravity's MCP store (or settings): **Context7** (current library docs) and **Playwright** (lets the agent open the app and take screenshots, which the UI Gate needs).

## 4. Start the local services
```bash
cp .env.example .env
docker compose up -d
docker compose ps        # postgres, valkey, minio, mailpit should be running
```
Optional later: `docker compose --profile ai up -d` (local AI model server) and `--profile cctv up -d`.

## 5. Turn on code review
Install the **CodeRabbit** GitHub App on your repo (https://coderabbit.ai). Config is already in `.coderabbit.yaml`.

## 6. Start building
Open `docs/PROMPTS.md` and paste **P-00** into Antigravity. Then paste **P-02** (design system), then one phase prompt at a time (P-10 onward).

## Things the agent will ask you for later (only when needed)
| When | What | Cost |
|---|---|---|
| Email sending (task 3.2 / deployment) | Free Brevo or Resend account → API/SMTP key | ₹0 |
| Deployment (task 15.8) | Oracle Cloud Always Free account (needs card verification) **or** a spare PC/college server + free Cloudflare account (Tunnel) | ₹0 |
| Domain | Free subdomain for the pilot; custom domain later | ~₹700/yr (optional) |
| First pilot property | Owner's UPI ID, photos, rent details | — |
| AI fallback (optional) | Free Gemini or Groq API key | ₹0 |
| CCTV hostels | A PC in the hostel to run `infra/edge-connector` | ₹0 |

## Troubleshooting
- **Agent designs UI without the skill / looks generic:** paste **P-06 (UI redo)**. Make sure `ui-quality` is Always On.
- **`graphify: command not found`:** `uv tool update-shell`, new terminal.
- **Port already in use:** change the port mapping in `docker-compose.yml`.
- **Agent keeps failing the same step:** paste **P-09 (unstick)**.
- **New chat / agent crashed:** paste **P-08 (resume)**.
