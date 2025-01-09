import { Pool } from 'pg';

const pool = new Pool({
    user: 'gabimoreira',
    host: 'localhost',
    database: 'doramigas', 
    password: 'gabi_doramigas@1125',
    port: 5432
});

export default pool;