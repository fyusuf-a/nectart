solana program dump -u d CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d core.so

solana-keygen new --no-bip39-passphrase --force -o keys/backend.json
sed -i "s/^VITE_BACKEND_PRIVATE_KEY=.*/VITE_BACKEND_PRIVATE_KEY=$(cat keys/backend.json)/" .env

