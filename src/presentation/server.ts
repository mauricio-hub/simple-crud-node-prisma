import express, { Router } from "express";
import path from "node:path";


interface Options {
    PORT: number;
    routes:Router;
    PUBLIC_PATH?: string;
}


export class Server {

    private app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes:Router;

    constructor(private options: Options) {
        const { PORT, routes ,PUBLIC_PATH = 'public' } = options;
        this.port = PORT;
        this.publicPath = PUBLIC_PATH;
        this.routes = routes;
    }

    async start() {

        //middlewares
        //serializar el body de la request a json
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //public folder
        this.app.use(express.static(this.publicPath))


        
        //* Routes
       this.app.use(this.routes);

        // SPA fallback route for serving index.html for any unmatched routes
        this.app.use((req, res) => {
            const indexPath = path.join(`../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}