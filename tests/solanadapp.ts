import * as anchor from '@project-serum/anchor';
const { SystemProgram } = anchor.web3;

describe('solanadapp', () => {

  console.log("🚀 Starting test...")

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  it('Is initialized!', async () => {

    const program = anchor.workspace.Solanadapp;
    const baseAccount = anchor.web3.Keypair.generate();

    let tx = await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())

    await program.rpc.addGif("https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('👀 GIF Count', account.totalGifs.toString())
    console.log('👀 GIF List', account.gifList)
  });
});
