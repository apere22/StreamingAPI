# StreamingAPI
This project is a school project. It is an API that lists all the films and series with their information (genre, type, director, actor...).

## Installing the project
Import the project
```bash
git clone https://github.com/Xxapere22xX/StreamingAPI.git
```
Install dependances
```bash
npm i
```
In mongoDB create database called streaming


Start server
```bash
npm start
```
Default route: mongodb://localhost/streaming

Default port: 3000


You can change default route and default port in .env file

## Routes
Videos
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /videos | Get all videos |  |
| GET | /videos/get/:id | Get specific video |  |
| GET | /videos/search/:search | Get result search videos |  |
| GET | /videos/order/year | Get sort videos years |  |
| POST | /videos/new | Create new video | [JSON](#new_videos) |
| DELETE | /videos/delete/:id | Delete specific video | |
| PATCH | /videos/update/:id / Update specific video | JSON |
| PATCH | /videos/update/genres/add/:id | Add genre in specific video | [JSON](#update_videos_add) |
| PATCH | /videos/update/genres/delete/:id/:genre_id | Delete genre in specific video |  |
| PATCH | /videos/update/directors/add/:id | Add director in specific video | [JSON](#update_videos_add) |
| PATCH | /videos/update/directors/delete/:id/:director_id | Delete director in specific video |  |
| PATCH | /videos/update/actors/add/:id | Add actor in specific video | [JSON](#update_videos_add) |
| PATCH | /videos/update/actors/delete/:id/:actor_id | Delete actor in specific video |  |

Genres
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /genres | Get all genres |  |
| GET | /genres/get/:id | Get specific genre |  |
| POST | /genres/new | Create new genre | [JSON](#new_genre) |
| DELETE | /genres/delete/:id | Delete specific genre | |
| PATCH | /genres/update/:id / Update specific genre | JSON |

Types
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /type | Get all types |  |
| GET | /type/get/:id | Get specific type |  |
| POST | /type/new | Create new type | [JSON](#new_type) |
| DELETE | /type/delete/:id | Delete specific type | |
| PATCH | /type/update/:id / Update specific type | JSON |

Directors
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /directors | Get all directors |  |
| GET | /directors/get/:id | Get specific director |  |
| POST | /directors/new | Create new director | [JSON](#new_director) |
| DELETE | /directors/delete/:id | Delete specific director | |
| PATCH | /directors/update/:id / Update specific director | JSON |

Actors
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /actors | Get all actors |  |
| GET | /actors/get/:id | Get specific actor |  |
| POST | /actors/new | Create new actor | [JSON](#new_actor) |
| DELETE | /actors/delete/:id | Delete specific actor | |
| PATCH | /actors/update/:id / Update specific actor | JSON |

Platforms
| Method | Url | Decription | Sample Valid Request Body | 
| ------ | --- | ---------- | --------------------------- |
| GET | /platforms | Get all platforms |  |
| GET | /platforms/get/:id | Get specific platform |  |
| POST | /platforms/new | Create new platform | [JSON](#new_platform) |
| DELETE | /platforms/delete/:id | Delete specific platform | |
| PATCH | /platforms/update/:id / Update specific platform | JSON |


## Schemas
Videos (Films)
##### <a id="new_videos">Create videos ->/videos/new</a>
```json
{
        "name": "Star Wars: Le Réveil de la Force",
        "code": "star-wars-le-réveil-de-la-force",
        "description": "Il y a bien longtemps, dans une galaxie lointaine… Luke Skywalker est porté disparu. Le pilote Poe est en mission secrète sur une planète pour le retrouver. Au moment où la diabolique armée \"Premier Ordre\" apparaît en détruisant tout sur son passage, il arrive à cacher la position géographique de l'ancien maître Jedi dans son droïde BB-8. Capturé par les larbins du machiavélique Kylo Ren, Poe est libéré par le soldat ennemi Finn qui est en pleine crise existentielle. Pendant ce temps, BB-8 est recueillie par Rey, une pilleuse d'épaves qui sera bientôt plongée dans une quête qui la dépasse.",
        "year": "2015",
        "links": [
            "https://www.youtube.com/watch?v=mH9Ygfs5avo",
            "https://www.youtube.com/watch?v=Y9b1gBTztCI"
        ],
        "seasons": [],
        "genres": ["61e9667781f2ea646487dde5"],
        "type": "61ec2891ad645686ba2ada33",
        "directors": ["61ec619343f6fe92e5ddc058", "61ec61c343f6fe92e5ddc05a"],
        "actors": ["61ed6057f2d0780114e9cf20", "61ed6043f2d0780114e9cf1e", "61ed6029f2d0780114e9cf1c"]
    }
```
(Series)
```json
{
        "genres": [],
        "type": null,
        "directors": [],
        "actors": [],
        "plaform": null,
        "name": "Game of Thrones",
        "code": "game-of-thrones",
        "description": "Il y a très longtemps, à une époque oubliée, une force a détruit l'équilibre des saisons. Dans un pays où l'été peut durer plusieurs années et l'hiver toute une vie, des forces sinistres et surnaturelles se pressent aux portes du Royaume des Sept Couronnes. La confrérie de la Garde de Nuit, protégeant le Royaume de toute créature pouvant provenir d'au-delà du Mur protecteur, n'a plus les ressources nécessaires pour assurer la sécurité de tous. Après un été de dix années, un hiver rigoureux s'abat sur le Royaume avec la promesse d'un avenir des plus sombres. Pendant ce temps, complots et rivalités se jouent sur le continent pour s'emparer du Trône de Fer, le symbole du pouvoir absolu.",
        "year": "2011",
        "links": [],
        "seasons": [
            {
                "num": 1,
                "name": "Season 1",
                "episodes": [
                    {
                        "num": 1,
                        "name": "Winter Is Coming",
                        "links": [],
                    },
                    {
                        "num": 2,
                        "name": "The Kingsroad",
                        "links": [],
                    }
                ],
            },
            {
                "num": 2,
                "name": "Season 2",
                "episodes": [
                    {
                        "num": 1,
                        "name": "The North Remembers",
                        "links": [],
                    },
                    {
                        "num": 2,
                        "name": "The Night Lands",
                        "links": [],
                    },
                    {
                        "num": 3,
                        "name": "What Is Dead May Never Die",
                        "links": [],
                    }
                ],
            }
        ],
    }
```
##### <a id="update_videos_add">Add genre in video ->/videos/update/genres/add/:id</a>
```json
["61ed5e80f2d0780114e9cf14"]
```

##### <a id="new_genre">Add genre in video ->/genres/new</a>
```json
{
    "name": "Action",
    "code": "action"
}
```
##### <a id="new_actor">Add genre in video ->/actors/new</a>
```json
{
    "name": "Kit Harington",
    "code": "kit-harington"
}
```
##### <a id="new_type">Add genre in video ->/type/new</a>
```json
{
    "name": "Films",
    "code": "films"
}
```
##### <a id="new_director">Add genre in video ->/directors/new</a>
```json
{
    "name": "Lawrence Kasdan",
    "code": "lawrence-kasdan"
}
```
##### <a id="new_platform">Add genre in video ->/platforms/new</a>
```json
{
    "name": "Disney",
    "code": "disney",
    "logo": "http://logo-disney.png",
    "price": 6.5,
    "videos": []
}
```
