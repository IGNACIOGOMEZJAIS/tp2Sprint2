const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Grupo-08:grupo08@cursadanodejs.ls9ii.mongodb.net/Node-js';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    creador: [String],
    createdAt: { type: Date, default: Date.now }
});

const SuperHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-08');

async function insertSuperHero() {
    try {
        const hero = new SuperHero({
            nombreSuperHeroe: 'Nachost',
            nombreReal: 'Parker',
            edad: 24,
            planetaOrigen: 'Tierra',
            debilidad: 'Lava',
            poderes: ['Agilidad','Fuerza'],
            aliados: ['Spiderman'],
            enemigos: ['Duende Verde']
        });
        await hero.save();
        console.log('Superhéroe insertado:', hero);
    } catch (error) {
        console.error('Error al insertar superhéroe:', error);
    }
}

async function updateSuperHero(nombreSuperHeroe) {
    try {
        const result = await SuperHero.updateOne(
            { nombreSuperHeroe: nombreSuperHeroe },
            { $set: { edad: 26 } }
        );
        console.log('Resultado de la actualización:', result);
    } catch (error) {
        console.error('Error al actualizar superhéroe:', error);
    }
}

async function deleteSuperHero(nombreSuperHeroe) {
    try {
        const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
        console.log('Superhéroe eliminado:', result);
    } catch (error) {
        console.error('Error al eliminar superhéroe:', error);
    }
}

async function findSuperHeroes() {
    try {
        const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
        console.log('Superhéroes encontrados:', heroes);
    } catch (error) {
        console.error('Error al buscar superhéroes:', error);
    }
}

async function main() {
    await insertSuperHero();
    await updateSuperHero('Nachost');
    await findSuperHeroes();
    await deleteSuperHero('Spiderman');
}

main();
