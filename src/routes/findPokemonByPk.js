const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/pokemons/:id', auth, (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                if (pokemon === null) {
                    const message = `Le pokemon demendé n'existe pas. Réessayer avec un autre identifiant !`
                    return res.status(404).json({message})
                }
                const message = 'Un pokemon a bien été trouvé !'
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = `Le pokemon n'a pas pu être récupérée !`
                res.status(500).json({message, data: error})
            })
    })
}