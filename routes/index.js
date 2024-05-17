const express = require('express');
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');

const injectRoutes = (api) => {
    api.get('/status', App.AppController.getStatus);
    api.get('/stats', AppController.getStats);

    api.get('/connect', basicAuthenticate, AuthController.getConnect);
    api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

    api.post('/users', UsersController.postNew);
    api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

    api.post('/files', xTokenAuthenticate, FilesController.postUpload);
    api.get('files/:id', xTokenAuthenticate, FilesController.getShow);
    api.get('files', xTokenAthenticate, FilesController.getIndex);
    api.put('files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
    api.put('files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
    api.get('files/:id/data', FilesController.getFile);

    api.all('*', (req, res, next) => {
        errorResponse(new MongoAPIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
    });
    api.use(errorResponse);
};

export default injectRoutes;






















// router.get('/status', AppController.getStatus);
// router.get('/stats', AppController.getStats);
// router.post('/users', AppController.postNew);
// router.get('/connect', AuthController.getConnect);
// router.get('/disconnect', AuthController.getDisconnect);
// router.get('/users/me', UserController.getMe);
// 
// module.exports = router;