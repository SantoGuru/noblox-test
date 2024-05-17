module.exports = async(ms)=>{
        return await new Promise((resolve) =>
          setTimeout(resolve, ms)
        );
}