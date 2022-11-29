COMPILE_DOCS="yarn tsc src/*.doc.ts --types react --moduleResolution node  --target esNext  --module CommonJS && generate-docs --input ./src --output ./docs/generated && rm -rf src/**/*.doc.js src/*.doc.js"
COMPILE_STATIC_PAGES="yarn tsc docs/staticPages/*.doc.ts --types react --moduleResolution node  --target esNext  --module CommonJS && generate-docs --isLandingPage --input ./docs/staticPages --output ./docs/generated && rm -rf docs/staticPages/*.doc.js"

eval $COMPILE_DOCS 
eval $COMPILE_STATIC_PAGES
