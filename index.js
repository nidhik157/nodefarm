
const fs = require("fs");
const http=require("http");
const url=require("url");
const replaceTemplate=require("./modules/replacetemplates");

const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8')
const tempProduct=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8')
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8')
const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj=JSON.parse(data);
const server=http.createServer((req,res)=>{
   
    const {pathname,query}=url.parse(req.url,true);

    //Overview page
    if(pathname==='/'||pathname==='/overview'){
        // res.end('This is the overview');
        res.writeHead(200,{'Content-type':'text/html'})
        const cardHTML=dataObj.map(el=>replaceTemplate(tempCard,el)).join();
        // console.log(cardHTML);
        const output=tempOverview.replace('{%product_cards%}',cardHTML);
        res.end(output)
    }
    //product page
        else if(pathname==='/product')
        {

            // res.end('This is the product');
            res.writeHead(200,{'Content-type':'text/html'});
            const product=dataObj[query.id];
             
            
            const output=replaceTemplate(tempProduct,product);
            res.end(output);
        }
     
    //Api call page
    else if(pathname==='/api')
    {
       
            res.writeHead(200,{
                'Content-type':'application/json'
            });
            res.end(data)
    }
    else {
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        //Not found page
        res.end("<h1>Page not found</h1>");}
})
server.listen(8000,'127.0.0.1',()=>{
    console.log("Listening to requests on port 8000");
})
