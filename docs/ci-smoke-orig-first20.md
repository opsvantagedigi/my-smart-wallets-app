name: CI — Build and Smoke Test

on:
  pull_request:
    branches: [ main, cleanup/cloudflare-deploy ]
  push:
    branches: [ cleanup/cloudflare-deploy ]

jobs:
  build-and-smoke:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node 20
        uses: actions/setup-node@v4
        with:
          node-version: 20

