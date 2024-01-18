const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris.'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas être vide !' },
                notNull: { msg: 'Le nom est une propriéte requise !' }
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres entier pour les points de vie.'},
                notNull: { msg: 'Les points de vie sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les points de vie doivent être supérieur à 0.'
                },
                max: {
                    args: [999],
                    msg: 'Les points de vie doivent être inférieures ou égales à 999.'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres entier pour les points de dégâts.'},
                notNull: { msg: 'Les points de dégâts sont une propriété requise.' },
                min: {
                    args: [0],
                    msg: 'Les points de dégâts doivent être supérieur à 0.'
                },
                max: {
                    args: [99],
                    msg: 'Les points de dégâts doivent être inférieures ou égales à 99.'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Utiliser uniquement une URL valide pour l\'image.'},
                notNull: { msg: 'L\'image est une propriété requise.' }
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Un pokemon doit au moins voir un type.')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Un pokemon ne doit pas avoir plus de trois types.')
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)) {
                            throw new Error(`Le type d'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updateAt: false
    })
}