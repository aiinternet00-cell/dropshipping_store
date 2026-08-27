import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {extname,join,normalize} from 'node:path';
const root=process.argv[2]||'.', port=Number(process.env.PORT)||4173;
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
createServer(async(req,res)=>{try{const pathname=new URL(req.url,'http://localhost').pathname;let file=normalize(join(root,pathname==='/'?'index.html':pathname));if(!(await stat(file)).isFile())file=join(root,'index.html');res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(await readFile(file))}catch{res.statusCode=404;res.end('Not found')}}).listen(port,()=>console.log(`Morrow running at http://localhost:${port}`));
