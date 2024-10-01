solana program dump -u d CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d core.so

VITE_BACKEND_PRIVATE_KEY=$(grep "VITE_BACKEND_PRIVATE_KEY" .env | cut -d '=' -f2)

if [ "$VITE_BACKEND_PRIVATE_KEY" == "" ]; then
  echo "VITE_BACKEND_PRIVATE_KEY not found in .env"
  solana-keygen new --no-bip39-passphrase --force -o keys/backend.json
  sed -i "s/^VITE_BACKEND_PRIVATE_KEY=.*/VITE_BACKEND_PRIVATE_KEY=$(cat keys/backend.json)/" .env
fi
