export default async function handler(req, res) {
    const {signed_msg} = JSON.parse(req.body);
    const { address, body } = await Web3Token.verify(signed_msg);
  
    console.log('Public Address Retrieved', address);
  
    try {
      // Find user 
      
    } catch (error) {
      // If user not found in database create a new user
      
    }
  
  }