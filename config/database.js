if(process.env.NODE_ENV === 'production'){
  module.exports = {mongoURI: 'mongodb://agoulzi:uwSh99HL3d6eqP9@ds026658.mlab.com:26658/examgen'}
} else {
  module.exports = {mongoURI: 'mongodb://localhost/examGen'}
}