/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/syx',
  sessionSecret: process.env.SESSION_SECRET || 'Session Secret',
  google: {
    clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
    callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  },
  github: {
  	clientID: process.env.GITHUB_CLIENTID || 'ffc693ca6b42004930a6',
  	clientSecret: process.env.GITHUB_SECRET || '4f66dce359f32ab172bcf49972289ebfd0781f3e',
  	callbackURL: process.env.GITHUB_CALLBACK || "/auth/github/callback"
  }
};
