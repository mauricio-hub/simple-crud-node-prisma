import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    console.log(req.url)

    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.write('<h1>Hello World !!!!!!!!</h1>');
    //     res.end('Hello World\n');
    //
    // const data = {
    //     name: 'John Doe',
    //     age: 30,
    //     email: 'john.doe@example.com'
    // };


    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify(data));


    /*     if (req.url === '/') {
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            const cssFile = fs.readFileSync('./public/style.css', 'utf-8');
            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
    
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(htmlFile.replace('</head>', `<style>${cssFile}</style></head>`).replace('</body>', `<script>${jsFile}</script></body>`));
        }else{
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } */

    if (req.url !== '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }

    const html = fs.readFileSync('./public/index.html', 'utf8');
    const css = fs.readFileSync('./public/style.css', 'utf8');
    const js = fs.readFileSync('./public/js/app.js', 'utf8');

    let page = html;
    page = page.replace('</head>', `<style>${css}</style></head>`);
    page = page.replace('</body>', `<script>${js}</script></body>`);

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.end(page);


});




server.listen(3000, () => {
    console.log('Server running on port 3000');
});