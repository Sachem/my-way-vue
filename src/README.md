Installation steps for local development.

1. npm install
2. ionic serve

potential issues:

"[ERROR] Invalid project type: vue-vite (project config: .\ionic.config.json).

        Project type must be one of: angular, react, vue, ionic-angular, ionic1, custom"

for the above, try:

npm uninstall -g @ionic/cli
npm install -g @ionic/cli@latest