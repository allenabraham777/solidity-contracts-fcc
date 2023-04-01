import ethers from "ethers";
import fs from "fs";
import { config } from "dotenv";
config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD!,
    process.env.PRIVATE_KEY!
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./secret.json", encryptedJsonKey);
}

main();
