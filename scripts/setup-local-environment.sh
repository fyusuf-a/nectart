mkdir -p bin

solana program dump -um CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d bin/core.so

solana program dump -um CMACYFENjoBMHzapRXyo1JZkVS6EtaDDzkjMrmQLvr4J bin/candy_machine_core.so

solana program dump -um CMAGAKJ67e9hRZgfC5SFTbZH8MgEmtqazKXjmkaJjWTJ bin/candy_guard.so

VITE_BACKEND_PRIVATE_KEY=$(grep "VITE_BACKEND_PRIVATE_KEY" .env | cut -d '=' -f2)

if [ "$VITE_BACKEND_PRIVATE_KEY" == "" ]; then
  echo "VITE_BACKEND_PRIVATE_KEY not found in .env"
  solana-keygen new --no-bip39-passphrase --force -o keys/backend.json
  sed -i "s/^VITE_BACKEND_PRIVATE_KEY=.*/VITE_BACKEND_PRIVATE_KEY=$(cat keys/backend.json)/" .env
fi
