import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction
} from "@solana/web3.js";

const simulateFlag = process.argv.includes("--simulate");
const rpcUrl = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
const connection = new Connection(rpcUrl, "confirmed");
const payer = Keypair.generate();
const provider = Keypair.generate();
const memoProgramId = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

const receipt = {
  app: "AgentPass Guard",
  agent: "Research Agent",
  service: "Pay.sh Research API",
  policy: "auto-approved-under-0.02-usdc",
  amount: "1000 lamports devnet proof"
};

console.log("Creating temporary devnet payer:", payer.publicKey.toBase58());

if (simulateFlag) {
  printSimulation("Simulation mode requested via --simulate flag.");
  process.exit(0);
}

try {
  await fundPayer();
} catch (error) {
  printSimulation(`Devnet faucet unavailable: ${error.message}`);
  console.log(
    "\nTo run a real devnet transaction later, fund the payer wallet manually at https://faucet.solana.com and re-run, or set SOLANA_RPC_URL to a private RPC."
  );
  process.exit(0);
}

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: provider.publicKey,
    lamports: 1000
  }),
  new TransactionInstruction({
    keys: [],
    programId: memoProgramId,
    data: Buffer.from(JSON.stringify(receipt), "utf8")
  })
);

const signature = await sendAndConfirmTransaction(connection, transaction, [payer], {
  commitment: "confirmed"
});

console.log("Provider wallet:", provider.publicKey.toBase58());
console.log("Transaction signature:", signature);
console.log(`Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

async function fundPayer() {
  const attempts = [0.02, 0.01, 0.005];
  let lastError;

  for (const sol of attempts) {
    try {
      console.log(`Requesting ${sol} devnet SOL from faucet...`);
      const airdropSignature = await connection.requestAirdrop(payer.publicKey, sol * LAMPORTS_PER_SOL);
      await connection.confirmTransaction(airdropSignature, "confirmed");
      return;
    } catch (error) {
      lastError = error;
      console.log(`Airdrop attempt failed: ${error.message}`);
    }
  }

  throw new Error(
    `Faucet returned errors after ${attempts.length} attempts. Last error: ${lastError?.message}`
  );
}

function printSimulation(reason) {
  console.log(`\n${reason}`);
  console.log("Falling back to a simulated receipt so the demo flow stays inspectable.\n");
  const simulatedSignature = `sim-${Date.now().toString(16)}-${payer.publicKey.toBase58().slice(0, 8)}`;
  console.log("Provider wallet:", provider.publicKey.toBase58());
  console.log("Simulated signature:", simulatedSignature);
  console.log("Receipt payload:", JSON.stringify(receipt, null, 2));
}
