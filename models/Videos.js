const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Episodes = {
    num:{type: Number, required: true},
    name:String,
    links: {type: Array, required: true}
};
const Seasons = {
    num:{type: Number, required: true},
    name:String,
    episodes: [Episodes]
};
const VideoSchema = new mongoose.Schema({
    name: {type: String, required: true},
    code: {type: String, required: true},
    description: {type: String, required: true},
    year: {type: String, required: true},
    links: Array,
    update: {type: Date, default: Date.now()},
    seasons: [Seasons],
    genres: [{type: mongoose.Schema.Types.ObjectId, ref: "Genres"}],
    type: {type: mongoose.Schema.Types.ObjectId, ref: "Type"},
    directors: [{type: mongoose.Schema.Types.ObjectId, ref: "Directors"}],
    actors: [{type: mongoose.Schema.Types.ObjectId, ref: "Actors"}],
    platform: {type: mongoose.Schema.Types.ObjectId, ref: "Platforms"},
});

module.exports = mongoose.model('Videos', VideoSchema);

/**
 * {
        "_id": "61e928ff2c66640b9484a6b8",
        "name": "Star Wars: Le Réveil de la Force",
        "code": "star-wars-le-réveil-de-la-force",
        "description": "Il y a bien longtemps, dans une galaxie lointaine… Luke Skywalker est porté disparu. Le pilote Poe est en mission secrète sur une planète pour le retrouver. Au moment où la diabolique armée \"Premier Ordre\" apparaît en détruisant tout sur son passage, il arrive à cacher la position géographique de l'ancien maître Jedi dans son droïde BB-8. Capturé par les larbins du machiavélique Kylo Ren, Poe est libéré par le soldat ennemi Finn qui est en pleine crise existentielle. Pendant ce temps, BB-8 est recueillie par Rey, une pilleuse d'épaves qui sera bientôt plongée dans une quête qui la dépasse.",
        "year": "2015",
        "links": [
            "https://www.youtube.com/watch?v=mH9Ygfs5avo",
            "https://www.youtube.com/watch?v=Y9b1gBTztCI"
        ],
        "update": "2022-01-20T09:14:46.106Z",
        "seasons": [],
        "__v": 0,
        "genres": [
            {
                "videos": [],
                "_id": "61e93fe6fd38d32e3944d654",
                "name": "Action",
                "code": "action",
                "__v": 0
            }
        ]
    }

     {
        "genres": []
        "_id": "61e92d872c66640b9484a6ba",
        "name": "Game of Thrones",
        "code": "game-of-thrones",
        "description": "Il y a très longtemps, à une époque oubliée, une force a détruit l'équilibre des saisons. Dans un pays où l'été peut durer plusieurs années et l'hiver toute une vie, des forces sinistres et surnaturelles se pressent aux portes du Royaume des Sept Couronnes. La confrérie de la Garde de Nuit, protégeant le Royaume de toute créature pouvant provenir d'au-delà du Mur protecteur, n'a plus les ressources nécessaires pour assurer la sécurité de tous. Après un été de dix années, un hiver rigoureux s'abat sur le Royaume avec la promesse d'un avenir des plus sombres. Pendant ce temps, complots et rivalités se jouent sur le continent pour s'emparer du Trône de Fer, le symbole du pouvoir absolu.",
        "year": "2011",
        "links": [],
        "update": "2022-01-20T09:14:46.106Z",
        "seasons": [
            {
                "num": 1,
                "name": "Season 1",
                "episodes": [
                    {
                        "num": 1,
                        "name": "Winter Is Coming",
                        "links": [],
                        "_id": "61e92d872c66640b9484a6bc"
                    },
                    {
                        "num": 2,
                        "name": "The Kingsroad",
                        "links": [],
                        "_id": "61e92d872c66640b9484a6bd"
                    }
                ],
                "_id": "61e92d872c66640b9484a6bb"
            },
            {
                "num": 2,
                "name": "Season 2",
                "episodes": [
                    {
                        "num": 1,
                        "name": "The North Remembers",
                        "links": [],
                        "_id": "61e92d872c66640b9484a6bf"
                    },
                    {
                        "num": 2,
                        "name": "The Night Lands",
                        "links": [],
                        "_id": "61e92d872c66640b9484a6c0"
                    },
                    {
                        "num": 3,
                        "name": "What Is Dead May Never Die",
                        "links": [],
                        "_id": "61e92d872c66640b9484a6c1"
                    }
                ],
                "_id": "61e92d872c66640b9484a6be"
            }
        ],
        "__v": 0
    }
 */