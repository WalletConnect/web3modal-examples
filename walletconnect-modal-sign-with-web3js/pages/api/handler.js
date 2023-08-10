import nc from "next-connect";
import Web3 from "web3";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.get(function (req, res) {
  res.send("Hello World!");
});

handler.post(async function (req, res) {
  const web3 = new Web3("https://polygon-rpc.com");
  const message = `${process.env.NEXT_PUBLIC_MESSAGE} ${req?.body?.key}`;
  const data = await web3.eth.accounts.recover(message, req?.body?.signature);
  if (req.body?.address == data) {
    res.json({ success: req.body,data: data,isAuth:true });
    
  } else {
    res.json({ error:"Not a sign wallet",isAuth:false })
  }
});

export default handler;
